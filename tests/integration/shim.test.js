const { run, TARTUFO_SHIM } = require("./util");

describe("bin/tartufo-shim", () => {
  test("Can get tartufo version", async () => {
    const [stdout, stderr] = await run(TARTUFO_SHIM, ["--version"]);
    expect(stdout).toEqual(expect.stringMatching(/^tartufo, version [0-9]+\.[0-9]+\.[0-9]+$/i));
  });
});
