/**
 * AGY Path Validator Helper Library
 * Provides path validation functions for AGY runtime guardrail scripts.
 * Standardized with -agy.js suffix per AGENTS.md Section 11.
 */

/**
 * Checks if a string contains any Windows backslashes ('\').
 * @param {string} str - String to test
 * @returns {boolean} True if raw backslashes are found
 */
function hasWindowsBackslash(str) {
  if (typeof str !== 'string') return false;
  return str.includes('\\');
}

/**
 * Checks if a path targets the READ-ONLY target repository (d:/CLAUDE-PROJECT/website)
 * or relative website/ target path outside of harness/patches/.
 * @param {string} pathStr - Path string to inspect
 * @returns {boolean} True if path violates the READ-ONLY boundary
 */
function isReadonlyViolation(pathStr) {
  if (typeof pathStr !== 'string') return false;

  const normalized = pathStr.replace(/\\/g, '/').toLowerCase();

  // Explicit harness patch staging area is permitted
  if (normalized.includes('harness/patches/')) {
    return false;
  }

  // Absolute or normalized path checks targeting website repo
  if (
    normalized === 'd:/claude-project/website' ||
    normalized.startsWith('d:/claude-project/website/') ||
    normalized === 'website' ||
    normalized.startsWith('website/') ||
    normalized.endsWith('/website') ||
    normalized.includes('/website/')
  ) {
    return true;
  }

  return false;
}

module.exports = {
  hasWindowsBackslash,
  isReadonlyViolation
};
