const { run } = require("./util");

describe("bin/tartufo-shim", () => {
  test("Can get tartufo version", async () => {
    const [stdout] = await run("node", ["./bin/tartufo-shim", "--version"]);
    expect(stdout).toEqual(expect.stringMatching(/^tartufo, version [0-9]+\.[0-9]+\.[0-9]+$/i));
  });
});
