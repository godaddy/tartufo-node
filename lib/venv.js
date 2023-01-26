const path = require("path");
const isWin = require("./is-windows");

const VENV_PATH = path.resolve(path.join(__dirname, "../python_venv"));
const VENV_BIN_PATH = path.join(VENV_PATH, isWin ? "Scripts" : "bin");
const VENV_PYTHON_PATH = path.join(VENV_BIN_PATH, isWin ? "python.exe" : "python");
const VENV_PYTHON3_PATH = path.join(VENV_BIN_PATH, isWin ? "python3.exe" : "python3");
const VENV_TARTUFO_PATH = path.join(VENV_BIN_PATH, isWin ? "tartufo.exe" : "tartufo");

module.exports = {
  VENV_PATH,
  VENV_BIN_PATH,
  VENV_PYTHON_PATH,
  VENV_PYTHON3_PATH,
  VENV_TARTUFO_PATH,
};
