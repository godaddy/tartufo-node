/* eslint-disable no-console */
// This file must be indicated as "main" so that the shim script can run node to `require.resolve(...)` to find the venv directory
// It should never be actually included.
const isInstalledGlobally = require("is-installed-globally");
const tartufoSystem = require("./lib/tartufo-system");
const tartufoLocal = require("./lib/tartufo-local");

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

if (isInstalledGlobally) {
  console.log(`${RED}THIS MODULE SHOULD NOT BE INSTALLED GLOBALLY${RESET}`);
  console.log("Please run npm uninstall -g tartufo-node and install it locally instead");
}

module.exports = async () => (await tartufoSystem()) || (await tartufoLocal());
