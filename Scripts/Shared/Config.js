/**
 * @file Config.js
 * @brief Shared configuration for CI scripts
 */

/**
 * @constant Config
 * @brief Configuration for PR title validation
 * @detail Contains allowed types and regex pattern
 */
const Config = {
  CommitTypes: [
    "Feat",
    "Fix",
    "Chore",
    "Docs",
    "Style",
    "Refactor",
    "Perf",
    "Test",
    "CI",
    "Build",
    "Breaking",
  ],

  CommitPattern:
    /^(Feat|Fix|Chore|Docs|Style|Refactor|Perf|Test|CI|Build|Breaking)(\([a-zA-Z0-9_\-]+\))?!?: .+/,

  VersionMapping: {
    Breaking: { field: "Major", increment: 1 },
    Feat: { field: "Minor", increment: 1 },
    Fix: { field: "Patch", increment: 1 },
  },

  Files: {
    Version: "VERSION.md",
    Changelog: "CHANGELOG.md",
  },

  getIncrement(Type) {
    return this.VersionMapping[Type] || 0;
  },
};

module.exports = Config;
