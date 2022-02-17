const { promisify } = require("util");
const debug = require("debug")("tartufo-node");
const exec = promisify(require("child_process").exec);

/**
 * Use Python executable path to grab the version number
 *
 * @param {string} pythonPath Full path to python executable
 * @returns {[number, number, number] | []} Returns array of [major, minor, patch] or empty array on failure
 */
async function pythonVersion(pythonPath) {
  let stdout;
  let stderr;
  try {
    debug(`sh: ${pythonPath} --version`);
    const res = await exec(`${pythonPath} --version`);
    stdout = res.stdout;
    stderr = res.stderr;
    stdout && debug(`sh: ${stdout.trimEnd()}`);
    stderr && debug(`sh: ${stderr.trimEnd()}`);
    const [, version] = stdout.trim().split(" ");
    return version.split(".").map(v => Number(v));
  } catch (e) {
    stdout && debug(`sh: ${stdout.trimEnd()}`);
    stderr && debug(`sh: ${stderr.trimEnd()}`);
    debug(`Failed to parse Python version, expected "Python X.X.X"`);
    return [];
  }
}

module.exports = pythonVersion;
