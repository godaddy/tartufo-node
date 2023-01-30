/* eslint-disable no-process-env */
const path = require("path");
const { lookpath } = require("lookpath");
const globalDirs = require("global-dirs");

const NODE_BIN = ["node_modules", ".bin"].join(path.sep);
const POSSIBLE_NPM_PATHS = process.env.PATH.split(path.delimiter).filter(p => p.includes(NODE_BIN));

/**
 * Attempts to find system Tartufo by deliberately ignoring possible node/npm paths
 *
 * @returns {Promise<string | false>} Tartufo executable path, or false if not present
 */
async function tartufoSystem() {
  const tartufoPath = await lookpath("tartufo", {
    exclude: [...POSSIBLE_NPM_PATHS, globalDirs.npm.binaries, globalDirs.yarn.binaries],
  });

  return tartufoPath || false;
}

module.exports = tartufoSystem;
