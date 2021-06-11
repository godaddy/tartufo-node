#!/usr/bin/env node
/* eslint-disable no-console, no-process-exit */
const chalk = require("chalk");
const tartufoSystem = require("../lib/tartufo-system");
const tartufoLocal = require("../lib/tartufo-local");
const tartufoVersion = require("../lib/tartufo-version");
const pythonSystem = require("../lib/python-system");
const pythonLocal = require("../lib/python-local");
const pythonVersion = require("../lib/python-version");
const pythonMeetsMinimum = require("../lib/python-meets-minimum");

// eslint-disable-next-line complexity, max-statements
async function commandDoctor() {
  const tartufoSystemPath = await tartufoSystem();
  const tartufoLocalPath = await tartufoLocal();
  const tartufo = tartufoSystemPath || tartufoLocalPath;

  const pythonSystemPath = await pythonSystem();
  const pythonLocalPath = await pythonLocal();

  if (!pythonSystemPath) {
    console.log(chalk.white.bgRed(`Python not found globally or locally at either 'python3' or 'python'`));
    console.log("");
    console.log("We recommend following best practices for installing python on your local machine");
    process.exit(1);
  } else {
    const pythonSystemVersion = await pythonVersion(pythonSystemPath);
    const pythonSystemMeetsMinimum = pythonMeetsMinimum(pythonSystemVersion);
    let pythonSystemDisplayVersion;
    if (pythonSystemMeetsMinimum) {
      pythonSystemDisplayVersion = chalk.green(pythonSystemVersion.join("."));
    } else {
      pythonSystemDisplayVersion = chalk.red(pythonSystemVersion.join("."));
    }
    console.log(chalk`System\t{cyan Python}\tVersion: ${pythonSystemDisplayVersion}`);
    if (!pythonSystemMeetsMinimum) {
      console.log(
        chalk.yellow(`! Your system Python does not meet the requirements of ${pythonMeetsMinimum.MINIMUM_READABLE}.`)
      );
    }
  }

  if (!pythonLocalPath) {
    console.log(chalk`Local\t{cyan Python}\t{yellow was not found.} (Expected if using system tartufo)`);
  } else {
    const pythonLocalVersion = await pythonVersion(pythonLocalPath);
    const pythonLocalMeetsMinimum = pythonMeetsMinimum(pythonLocalVersion);
    let pythonLocalDisplayVersion;
    if (pythonLocalMeetsMinimum) {
      pythonLocalDisplayVersion = chalk.green(pythonLocalVersion.join("."));
    } else {
      pythonLocalDisplayVersion = chalk.red(pythonLocalVersion.join("."));
    }
    console.log(chalk`Local\t{cyan Python}\tVersion: ${pythonLocalDisplayVersion}`);
    if (!pythonLocalMeetsMinimum) {
      console.log(
        chalk.yellow(
          `! Your local (venv) Python does not meet the requirements of ${pythonMeetsMinimum.MINIMUM_READABLE}.`
        )
      );
    }
  }

  if (!tartufo) {
    console.log("");
    console.log(chalk.white.bgRed("Tartufo not found globally or locally!!"));
    console.log("");
    console.log(chalk`We recommend running {cyan npx tartufo-helper reset} to reinstall tartufo locally`);
    process.exit(1);
  }

  if (!tartufoSystemPath) {
    console.log(chalk`System\t{cyan Tartufo}\t{yellow was not found.} (Expected if using local tartufo)`);
  } else {
    const tartufoSystemVersion = await tartufoVersion(tartufoSystemPath);
    console.log(
      chalk`System\t{cyan Tartufo}\tVersion: {green ${tartufoSystemVersion.join(
        "."
      )}}\t{dim.white ${tartufoSystemPath}}`
    );
  }

  if (tartufoLocalPath) {
    const tartufoLocalVersion = await tartufoVersion(tartufoLocalPath);
    console.log(
      chalk`Local\t{cyan Tartufo}\tVersion: {green ${tartufoLocalVersion.join(".")}}\t{dim.white ${tartufoLocalPath}}`
    );
  } else {
    console.log(chalk`Local\t{cyan Tartufo}\t{yellow was not found.} (Expected if using system tartufo)`);
  }

  if (tartufoSystemPath && tartufoLocalPath) {
    console.log("The global install of Tartufo is preferred, thus the local version will not be used.");
    console.log(chalk`You can clean up your local install by running {cyan npx tartufo-helper reset}`);
    console.log("Alternatively, you can uninstall your system copy of tartufo if it is not needed elsewhere.");
  }

  console.log("");
  console.log(
    chalk`{green Your system is ready to use Tartufo!} You can try it out by running {cyan npx tartufo --version}`
  );
}

async function commandReset() {
  console.log("Cleaning up any remaining local installs...");
  await require("../lib/clean-local")();

  console.log("Triggering local install");
  await require("../lib/install-local")();
}

async function main() {
  const [, , command] = process.argv;

  switch (command) {
    case "doctor":
      return await commandDoctor();
    case "reset":
      return await commandReset();
    default:
      console.error("tartufo-helper <command>");
      console.error("");
      console.error("Commands:");
      console.error("  tartufo-helper doctor  Inspect and diagnose local setup issues");
      console.error("  tartufo-helper reset   Resets tartufo, installing locally if necessary");
      process.exit(1);
  }
}

if (require.main === module) main();
