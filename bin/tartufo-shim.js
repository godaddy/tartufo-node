#!/usr/bin/env node
/* eslint-disable no-console, no-process-exit */
const debug = require("debug")("tartufo");
const chalk = require("chalk");
const { spawn } = require("child_process");
const isInstalledGlobally = require("is-installed-globally");
const tartufoSystem = require("../lib/tartufo-system");
const tartufoLocal = require("../lib/tartufo-local");

if (isInstalledGlobally) {
  console.log(chalk.white.bgRed("THIS TARTUFO NPM MODULE SHOULD NOT BE INSTALLED GLOBALLY!"));
  console.log(chalk`Please run {cyan npm uninstall -g tartufo-node} and install it locally instead`);
  process.exit(1);
}

async function main() {
  // Prefer system tartufo, but source a tartufo path
  let tartufo = await tartufoSystem();
  if (!tartufo) {
    tartufo = await tartufoLocal();
  }

  // If tartufo was not found in the path, instruct the user on what to do
  if (!tartufo) {
    console.error(chalk.white.bgRed("Tartufo not found locally or globally!"));
    console.error(chalk`We recommend running {cyan npx tartufo-helper doctor} in this project to diagnose this issue.`);
    process.exit(0);
  }

  const [, , ...args] = process.argv;

  debug(chalk`{dim.white ${tartufo} ${args.join(" ")}}`);
  const subprocess = spawn(tartufo, args, { stdio: [process.stdin, process.stdout, process.stderr] });
  subprocess.on("error", err => {
    console.error(chalk.white.bgRed(`tartufo failed to run: ${err}`));
  });
  subprocess.on("close", code => process.exit(code));
}

if (require.main === module) main();
