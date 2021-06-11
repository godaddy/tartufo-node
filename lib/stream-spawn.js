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
    const subprocess = spawn(cmd, args, options);
    subprocess.stderr.on("data", data => log(String(data)));
    subprocess.stdout.on("data", data => log(String(data)));
    subprocess.on("close", code => {
      if (Number(code) === 0) return resolve();
      reject(code);
    });
  });
}

module.exports = streamSpawn;
