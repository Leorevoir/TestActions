/**
 * @file CheckPullRequestName.js
 * @brief Validates pull request titles against Conventional Commits format
 */

const PullRequestManager = require("./Shared/PullRequestManager.js");

/**
 * @function EntryPoint
 * @param Github - GitHub API client
 * @param Context - GitHub Actions context
 * @param Core - GitHub Actions core utilities
 */
module.exports = async ({ github, context, core }) => {
  try {
    const Title = context.payload.pull_request?.title;

    if (!Title) {
      throw new Error("Pull request title not found in context");
    }

    if (!PullRequestManager.Validate(Title)) {
      core.setFailed(PullRequestManager.GetErrorMessage(Title));
      return;
    }

    console.log(`PR title follows Conventional Commits format: "${Title}"`);
  } catch (CatchedError) {
    core.setFailed(`Script execution failed: ${CatchedError.message}`);
    throw CatchedError;
  }
};
