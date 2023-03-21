/* eslint-disable no-console, max-statements */
const chalk = require("chalk");
const debug = require("debug")("tartufo-node");
const pythonSystem = require("./python-system");
const pythonLocal = require("./python-local");
const pythonVersion = require("./python-version");
const pythonMeetsMinimum = require("./python-meets-minimum");
const tartufoSystem = require("./tartufo-system");
const streamSpawn = require("./stream-spawn");
const { VENV_PATH, VENV_PYTHON_PATH } = require("./venv");
const localConfig = require("./local-config");
const { validate } = require("./python-version-specifier");
const tartufoLocal = require("./tartufo-local");
const tartufoVersion = require("./tartufo-version");

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

  const config = await localConfig();
  const tartufo = await tartufoSystem();

  if (tartufo) {
    console.log(`Tartufo was found globally installed at ${tartufo}, skipping local install...`);
    return;
  }

  console.log("Tartufo is not globally installed, this package will now install a local copy...");

  const pythonSystemPath = await pythonSystem();

  if (!pythonSystemPath) {
    console.log(chalk.white.bgRed("Python 3 was not found on your system. Tartufo will not be installed."));
    console.log("Please run npx tartufo-helper doctor for more information on how to resolve");
    return;
  }
  const version = await pythonVersion(pythonSystemPath);
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

  const pythonLocalPath = await pythonLocal();
  debug(pythonLocalPath);
  if (!pythonLocalPath) {
    debug("Settuping up venv...");
    try {
      await streamSpawn(debug, pythonSystemPath, ["-m", "venv", VENV_PATH]);
    } catch (e) {
      console.log(chalk.white.bgRed(`Tartufo failed to setup a local venv.`));
      console.log(`Please run npx tartufo-helper doctor for more information on how to resolve`);
      return;
    }
  } else {
    debug("Found existing venv...");
  }

  debug("Installing tartufo...");
  try {
    if (config?.version) {
      if (!validate(config.version)) {
        console.log(chalk.white.bgRed(`Invalid Tartufo version provided.`));
        console.log(`Value of ${config.version} is not a valid Python PEP 440 version specifier`);
        console.log(`Installation will NOT continue, please see https://peps.python.org/pep-0440/#version-specifiers`);
        return;
      }

      await streamSpawn(debug, VENV_PYTHON_PATH, ["-m", "pip", "install", `"tartufo${config.version}"`]);
    } else {
      await streamSpawn(debug, VENV_PYTHON_PATH, ["-m", "pip", "install", "tartufo"]);
    }
  } catch (e) {
    console.log(chalk.white.bgRed(`Tartufo failed to install.`));
    console.log(`Please run npx tartufo-helper doctor for more information on how to resolve`);
    return;
  }

  try {
    const localTartufo = await tartufoLocal();
    const localVersion = await tartufoVersion(localTartufo);
    console.log(chalk.green(`Tartufo v${localVersion.join(".")} successfully installed!`));
  } catch (e) {
    console.log(chalk.white.bgRed(`Tartufo failed to install.`));
    console.log(`Please run npx tartufo-helper doctor for more information on how to resolve`);
    return;
  }
}

module.exports = installTartufoLocal;

if (require.main === module) installTartufoLocal();
