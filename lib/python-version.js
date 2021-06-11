const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

/**
 * Use Python executable path to grab the version number
 *
 * @param {string} pythonPath Full path to python executable
 * @returns {[number, number, number] | []} Returns array of [major, minor, patch] or empty array on failure
 */
async function pythonVersion(pythonPath) {
  try {
    const { stdout } = await exec(`${pythonPath} --version`);
    const [, version] = stdout.trim().split(" ");
    return version.split(".").map(v => Number(v));
  } catch (e) {
    return [];
  }
}

module.exports = pythonVersion;
