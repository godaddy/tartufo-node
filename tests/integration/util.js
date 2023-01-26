const { spawn } = require("child_process");

async function run(cmd, args) {
  return await new Promise((resolve, reject) => {
    let stdout = "";
    const stderr = "";
    const subprocess = spawn(cmd, args, { shell: true, stdio: "pipe" });
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
};
