/**
 * @file RepositoryManager.js
 * @brief GitHub repository file utilities
 */

/**
 * @class RepositoryManager
 * @brief Utility class for reading and writing files in a GitHub repository
 */
export default class RepositoryManager {
  /**
   * @brief Reads the content of a file from a GitHub repository
   * @param Github - The GitHub API client
   * @param Context - The context containing repository information
   * @param Path - The path to the file in the repository
   * @returns A promise containing the file content and its SHA hash
   */
  static async Read(Github, Context, Path) {
    try {
      const Response = await Github.rest.repos.getContent({
        owner: Context.repo.owner,
        repo: Context.repo.repo,
        path: Path,
        ref: Context.ref ?? "main",
      });

      return {
        Content: Buffer.from(Response.data.content, "base64").toString("utf8"),
        Sha: Response.data.sha,
      };
    } catch {
      return { Content: "", Sha: null };
    }
  }

  /**
   * @brief Writes content to a file in a GitHub repository, creating or updating it as necessary
   * @param Github - The GitHub API client
   * @param Context - The context containing repository information
   * @param Path - The path to the file in the repository
   * @param Content - The content to write to the file
   * @param Sha - The SHA hash of the existing file (if updating)
   * @param Message - The commit message for the change
   * @returns A promise that resolves when the file has been written
   */
  static async Write(Github, Context, Path, Content, Sha, Message) {
    await Github.rest.repos.createOrUpdateFileContents({
      owner: Context.repo.owner,
      repo: Context.repo.repo,
      path: Path,
      message: Message,
      content: Buffer.from(Content).toString("base64"),
      sha: Sha ?? undefined,
      branch: Context.ref.replace("refs/heads/", "") ?? "main",
    });
  }
}
