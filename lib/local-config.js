const { lilconfig } = require("lilconfig");

// No options to override for now!
const OPTIONS = {};
let _cache;

async function localConfig() {
  if (!_cache) {
    const { config } = await lilconfig("tartufo-node", OPTIONS).search();
    _cache = config;
  }
  return _cache;
}

module.exports = localConfig;
