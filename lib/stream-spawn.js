const { spawn } = require("child_process");

/**
 * Wraps child_process.spawn in a Promise while streaming stderr and stdout into a log function.
 *
 * @param {function} log Log function to accept and forward terminal output
 * @param {string} cmd Command to execute
 * @param {Array<string>} args Args to pass to command being executed
 * @param {Object} options Options to pass to child_process.spawn
 */
async function streamSpawn(log, cmd, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    log(`sh: ${cmd} ${args.join(" ")}`);
    const subprocess = spawn(cmd, args, { shell: true, ...options });
    subprocess.stderr.on("data", data => log(`sh: ${String(data).trimEnd()}`));
    subprocess.stdout.on("data", data => log(`sh: ${String(data).trimEnd()}`));
    subprocess.on("error", err => {
      log(err);
      reject(err);
    });
    subprocess.on("close", code => {
      if (Number(code) === 0) return resolve();
      reject(code);
    });
  });
}

module.exports = streamSpawn;
