/**
 * @file Changelog.js
 * @brief CHANGELOG.md handling
 */

/**
 * @class ChangelogManager
 * @brief Utility class for building and updating changelog entries
 */
class ChangelogManager {
  /**
   * @brief Builds a changelog entry based on the provided version and pull request information
   * @param Version - The version number for the changelog entry
   * @param PullRequest - An object containing the title and body of the pull request
   * @returns A formatted string representing the changelog entry
   */
  static BuildEntry(Version, PullRequest) {
    const NewDate = new Date().toISOString().split("T")[0];

    return [
      `## v${Version} - ${NewDate}`,
      ``,
      `### ${PullRequest.title}`,
      ``,
      PullRequest.body || "_No description provided_",
      ``,
    ].join("\n");
  }

  /**
   * @brief Updates the existing changelog content by inserting a new entry at the top
   * @param Current - The current content of the changelog
   * @param Entry - The new changelog entry to insert
   * @returns The updated changelog content with the new entry added
   */
  static Update(Current, Entry) {
    if (!Current.trim()) {
      return `# Changelog\n\n${Entry}`;
    }

    return Current.replace(/^# Changelog\s*/i, `# Changelog\n\n${Entry}\n`);
  }
}

module.exports = ChangelogManager;
