const { lookpath } = require("lookpath");

/**
 * Attempts to find the system python executable path. Prefers binaries named `python3` however
 * if not available it will accept binaries named `python`.
 *
 * @returns {Promise<string | false>} Python executable path, or false if not present
 */
async function whichPython() {
  const python3Path = await lookpath("python3");
  if (python3Path) return python3Path;
  const pythonPath = await lookpath("python");
  return pythonPath || false;
}

module.exports = whichPython;
