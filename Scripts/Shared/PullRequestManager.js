/**
 * @file PullRequest.js
 * @brief Pull request utilities
 */

const Config = require("./Config");

/**
 * @class PullRequestManager
 * @brief Utility class for pull request operations
 * @detail Provides methods to extract PR type, and validate titles
 */
export default class PullRequestManager {
  /**
   * @brief Checks if the pull request is a breaking change
   * @param Title - The title of the pull request
   * @returns True if it's a breaking change, false otherwise
   */
  static ExtractType(Title) {
    const Match = Title.match(/^([A-Za-z]+)(?:\([^)]+\))?!?:/);
    return Match ? Match[1] : null;
  }

  /**
   * @function GetErrorMessage
   * @brief Generates a detailed error message for invalid PR titles
   * @param Title - The PR title to validate
   * @returns Formatted error message
   */
  static GetErrorMessage(Title) {
    const TypeList = Config.CommitTypes.map((Type) => `  • ${Type}`).join("\n");

    return [
      `PR title does not follow Conventional Commits format`,
      ``,
      `Current title: "${Title}"`,
      ``,
      `Required format: <type>(<scope>): <message>`,
      ``,
      `Available types:`,
      TypeList,
      ``,
      `Examples:`,
      `  • Feat(ApplicationCore): Add MacOS window support`,
      `  • Fix(Renderer): Resolve shadow rendering glitch`,
      `  • Docs(Examples): Update BaseExample for new API changes`,
    ].join("\n");
  }

  /**
   * @function Validate
   * @brief Validates PR title format
   * @param Title - The PR title to validate
   * @returns true if valid, false otherwise
   */
  static Validate(Title) {
    return Config.CommitPattern.test(Title);
  }
}
