const path = require("path");
const fs = require("fs");
const { access } = require("fs").promises;
const { VENV_BIN_PATH } = require("./venv");

/**
 * Attempts to find the local (venv) python executable path. Prefers binaries named `python3` however
 * if not available it will accept binaries named `python`.
 *
 * @returns {Promise<string | false>} Python executable path, or false if not present
 */
async function whichPython() {
  const python3Path = path.join(VENV_BIN_PATH, "python3");
  try {
    await access(python3Path, fs.constants.X_OK);
    return python3Path;
  } catch (e) {
    // noop
  }

  const pythonPath = path.join(VENV_BIN_PATH, "python");
  try {
    await access(python3Path, fs.constants.X_OK);
    return pythonPath;
  } catch (e) {
    return false;
  }
}

module.exports = whichPython;
