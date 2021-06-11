const path = require("path");
const { spawn } = require("child_process");

const TARTUFO_SHIM = path.resolve(path.join(__dirname, "../../bin", "tartufo-shim.js"));
const TARTUFO_HELPER = path.resolve(path.join(__dirname, "../../bin", "tartufo-helper.js"));

async function run(cmd, args) {
  return await new Promise((resolve, reject) => {
    let stdout = "";
    const stderr = "";
    const subprocess = spawn(cmd, args);
    subprocess.stdout.on("data", data => {
      stdout += data.toString();
    });
    subprocess.stderr.on("data", data => {
      stdout += data.toString();
    });
    subprocess.on("close", code => {
      if (code) {
        const error = new Error(code);
        error.stdout = stdout.trim();
        error.stderr = stderr.trim();
        return reject(error);
      }
      return resolve([stdout.trim(), stderr.trim()]);
    });
  });
}

module.exports = {
  run,
  TARTUFO_SHIM,
  TARTUFO_HELPER,
};
