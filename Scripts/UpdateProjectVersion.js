/**
 * @file UpdateProjectVersion.js
 * @brief Updates VERSION.md and CHANGELOG.md based on merged pull request
 */

const Config = require("./Shared/Config.js");
const PullRequestManager = require("./Shared/PullRequestManager.js");
const VersionManager = require("./Shared/VersionManager.js");
const RepositoryManager = require("./Shared/RepositoryManager.js");
const ChangelogManager = require("./Shared/ChangelogManager.js");

/**
 * @function EntryPoint
 * @param Github - GitHub API client
 * @param Context - GitHub Actions context
 * @param Core - GitHub Actions core utilities
 */
module.exports = async ({ github, context, core }) => {
  try {
    const PullRequest = context.payload.pull_request;
    if (!PullRequest) {
      throw new Error("Pull request not found");
    }

    const PrType = PullRequestManager.ExtractType(PullRequest.title);
    const VersionType = Config.VersionMapping[PrType] ? PrType : "Fix";

    const VersionFile = await RepositoryManager.Read(
      github,
      context,
      Config.Files.Version,
    );
    const CurrentVersion = VersionFile.Content.trim() || "0.0.0";

    const Parsed = VersionManager.Parse(CurrentVersion);
    const NewVersion = VersionManager.Update(Parsed, VersionType);

    if (NewVersion === CurrentVersion) {
      core.info("No version bump required.");
      return;
    }

    const ChangelogFile = await RepositoryManager.Read(
      github,
      context,
      Config.Files.Changelog,
    );
    const Entry = ChangelogManager.BuildEntry(NewVersion, PullRequest);
    const UpdatedChangelog = ChangelogManager.Update(
      ChangelogFile.Content,
      Entry,
    );

    await RepositoryManager.Write(
      github,
      context,
      Config.Files.Version,
      NewVersion,
      VersionFile.Sha,
      `Chore(Release): Bump version to v${NewVersion}`,
    );

    await RepositoryManager.Write(
      github,
      context,
      Config.Files.Changelog,
      UpdatedChangelog,
      ChangelogFile.Sha,
      `Docs(Changelog): Update for v${NewVersion}`,
    );

    core.notice(`Version updated to v${NewVersion}`);
  } catch (CatchedError) {
    core.setFailed(`Release script failed: ${CatchedError.message}`);
    throw CatchedError;
  }
};
