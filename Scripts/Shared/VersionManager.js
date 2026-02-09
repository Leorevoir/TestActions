/**
 * @file UpdateProjectVersion.js
 * @brief Versions request utilities
 */

import Config from "./Config.js";

/**
 * @class VersionManager
 * @brief Utility class for parsing and updating project version
 */
export default class VersionManager {
  /**
   * @brief Parses a version string in the format "Major.Minor.Patch" into an object
   * @param Value - The version string to parse
   * @returns An object containing the Major, Minor, and Patch version numbers
   */
  static Parse(Value) {
    const Match = Value.match(/^(\d+)\.(\d+)\.(\d+)$/);

    if (!Match) {
      throw new Error(`Invalid version format: ${Value}`);
    }

    return {
      Major: Number(Match[1]),
      Minor: Number(Match[2]),
      Patch: Number(Match[3]),
    };
  }

  /**
   * @brief Updates a version string based on the specified type of increment (Major, Minor, Patch)
   * @param Current - The current version object containing Major, Minor, and Patch numbers
   * @param Type - The type of increment to apply (Major, Minor, Patch)
   */
  static Update(Current, Type) {
    const Next = { ...Current };
    const VersionMap = Config.getIncrement(Type);

    if (!VersionMap) {
      return `${Next.Major}.${Next.Minor}.${Next.Patch}`;
    }

    Next[VersionMap.field] += VersionMap.increment;

    switch (VersionMap.field) {
      case "Major":
        Next.Minor = 0;
        Next.Patch = 0;
        break;
      case "Minor":
        Next.Patch = 0;
        break;
      default:
        break;
    }

    return `${Next.Major}.${Next.Minor}.${Next.Patch}`;
  }
}
