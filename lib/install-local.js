/* eslint-disable no-console, max-statements */
const path = require("path");
const chalk = require("chalk");
const debug = require("debug")("tartufo-node");
const systemPython = require("./python-system");
const pythonVersion = require("./python-version");
const pythonMeetsMinimum = require("./python-meets-minimum");
const tartufoSystem = require("./tartufo-system");
const streamSpawn = require("./stream-spawn");
const { VENV_PATH, VENV_BIN_PATH } = require("./venv");

/**
 * Sets up a local venv and uses the venv's pip to install Tartufo
 *
 * Utilizing a venv helps prevent global install leakage and ensures local tartufos
 * never pollute or override global installs.
 */
async function installTartufoLocal() {
  /* eslint-disable-next-line no-process-env */
  if (process.env.CI_SKIP_TARTUFO) {
    console.log("Skipping Tartufo install due to CI_SKIP_TARTUFO");
    return;
  }

  const tartufo = await tartufoSystem();

  if (tartufo) {
    console.log(`Tartufo was found globally installed at ${tartufo}, skipping local install...`);
    return;
  }

  console.log("Tartufo is not globally installed, this package will now install a local copy...");

  const python3 = await systemPython();

  if (!python3) {
    console.log(chalk.white.bgRed("Python 3 was not found on your system. Tartufo will not be installed."));
    console.log("Please run npx tartufo-helper doctor for more information on how to resolve");
    return;
  }
  const version = await pythonVersion(python3);
  if (!pythonMeetsMinimum(version)) {
    const localVersion = version.join(".");
    console.log(
      chalk.white.bgRed(
        `Python ${pythonMeetsMinimum.MINIMUM_READABLE} is required to install Tartufo, ${localVersion} is installed. Tartufo will not be installed.`
      )
    );
    console.log(`Please run npx tartufo-helper doctor for more information on how to resolve`);
    return;
  }

  debug("Settuping up venv...");
  try {
    await streamSpawn(debug, python3, ["-m", "venv", VENV_PATH]);
  } catch (e) {
    console.log(chalk.white.bgRed(`Tartufo failed to setup a local venv.`));
    console.log(`Please run npx tartufo-helper doctor for more information on how to resolve`);
    return;
  }

  debug("Installing tartufo...");
  try {
    await streamSpawn(debug, path.join(VENV_BIN_PATH, "python"), ["-m", "pip", "install", "tartufo"]);
  } catch (e) {
    console.log(chalk.white.bgRed(`Tartufo failed to install.`));
    console.log(`Please run npx tartufo-helper doctor for more information on how to resolve`);
    return;
  }
}

module.exports = installTartufoLocal;

if (require.main === module) installTartufoLocal();
