const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

/**
 * Use Tartufo executable path to grab the version number
 *
 * @param {string} tartufoPath Full path to tartufo executable
 * @returns {[number, number, number] | []} Returns array of [major, minor, patch] or empty array on failure
 */
async function tartufoVersion(tartufoPath) {
  try {
    let { stdout: version } = await exec(`${tartufoPath} --version`);
    version = version.trim().split(" ").pop();
    return version.split(".").map(v => Number(v));
  } catch (e) {
    return [];
  }
}

module.exports = tartufoVersion;
