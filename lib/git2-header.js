const { platform } = require("os");
const { promisify } = require("util");
const { access } = require("fs/promises");
const { constants } = require("fs");
const { join } = require("path");
const exec = promisify(require("child_process").exec);

const debug = require("debug")("tartufo-node");
const { lookpath } = require("lookpath");

const MAC_OS_PLATFORM = "darwin";
const GIT_HEADER = "git2.h";
const libPaths = ["/usr/include", "/usr/local/include"];

/**
 * Attempts to find the git2.h header file as it's a requirement to build libgit
 * which is required to build pygit2 which is required by tartufo
 *
 * @returns {Promise<boolean>} is git2.h header present
 */
async function hasGit2Header() {
  const paths = await getIncludePaths();
  for (const path of paths) {
    const fn = join(path, GIT_HEADER);
    try {
      await access(fn, constants.R_OK);
      return true;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  return false;
}

/**
 * Attempts to interrogate macOS for its SDK-specific header path, and returns
 * an array of paths that could include system headers
 *
 * @returns {Promise<string[]>} file paths
 */
async function getIncludePaths() {
  if (platform() === MAC_OS_PLATFORM) {
    const xcrunPath = await lookpath("xcrun");
    debug(`sh: ${xcrunPath} --show-sdk-path`);
    const res = await exec(`${xcrunPath} --show-sdk-path`);
    try {
      res.stdout && debug(`sh: ${res.stdout.trimEnd()}`);
      res.stderr && debug(`sh: ${res.stderr.trimEnd()}`);
      return libPaths.concat(res.stdout.trim());
    } catch (e) {
      res.stdout && debug(`sh: ${res.stdout.trimEnd()}`);
      res.stderr && debug(`sh: ${res.stderr.trimEnd()}`);
      debug("Failed to run xcrun --show-sdk-path, will not check macOS specific paths");
      return libPaths.concat([]);
    }
  } else {
    return libPaths.concat([]);
  }
}

module.exports = hasGit2Header;
