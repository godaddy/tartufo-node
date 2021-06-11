const path = require("path");

const VENV_PATH = path.resolve(path.join(__dirname, "../python_venv"));
const VENV_BIN_PATH = path.join(VENV_PATH, "bin");

module.exports = {
  VENV_PATH,
  VENV_BIN_PATH,
};
