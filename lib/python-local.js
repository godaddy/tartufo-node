const fs = require("fs");
const { access } = require("fs").promises;
const { VENV_PYTHON_PATH, VENV_PYTHON3_PATH } = require("./venv");

/**
 * Attempts to find the local (venv) python executable path. Prefers binaries named `python3` however
 * if not available it will accept binaries named `python`.
 *
 * @returns {Promise<string | false>} Python executable path, or false if not present
 */
async function whichPython() {
  try {
    await access(VENV_PYTHON3_PATH, fs.constants.X_OK);
    return VENV_PYTHON3_PATH;
  } catch (e) {
    // ignore
  }

  try {
    await access(VENV_PYTHON_PATH, fs.constants.X_OK);
    return VENV_PYTHON_PATH;
  } catch (e) {
    return false;
  }
}

module.exports = whichPython;
