const path = require("path");
const fs = require("fs");
const { access } = require("fs").promises;
const { VENV_BIN_PATH } = require("./venv");

/**
 * Attempts to find local tartufo by checking the local venv path
 *
 * @returns {Promise<string | false>} Tartufo executable path, or false if not present
 */
async function tartufoLocal() {
  const tartufoPath = path.join(VENV_BIN_PATH, "tartufo");

  try {
    await access(tartufoPath, fs.constants.X_OK);
    return tartufoPath;
  } catch (e) {
    return false;
  }
}

module.exports = tartufoLocal;
