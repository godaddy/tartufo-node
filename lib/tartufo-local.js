const fs = require("fs");
const { access } = require("fs").promises;
const { VENV_TARTUFO_PATH } = require("./venv");

/**
 * Attempts to find local tartufo by checking the local venv path
 *
 * @returns {Promise<string | false>} Tartufo executable path, or false if not present
 */
async function tartufoLocal() {
  try {
    await access(VENV_TARTUFO_PATH, fs.constants.X_OK);
    return VENV_TARTUFO_PATH;
  } catch (e) {
    return false;
  }
}

module.exports = tartufoLocal;
