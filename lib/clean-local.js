const debug = require("debug")("tartufo-node");
const { promisify } = require("util");
const fs = require("fs");
const rmdir = promisify(fs.rmdir);
const { VENV_PATH } = require("./venv");

/**
 * Removes the venv directory created by local tartufo install
 */
async function cleanVenv() {
  debug("Removing venv...");
  try {
    await rmdir(VENV_PATH, { recursive: true });
    return true;
  } catch (e) {
    debug(e);
    return false;
  }
}

module.exports = cleanVenv;

if (require.main === module) cleanVenv();
