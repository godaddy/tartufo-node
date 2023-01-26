const { run } = require("./util");

describe("bin/tartufo-helper", () => {
  test("Run tartufo-helper doctor", async () => {
    const [stdout] = await run("node", ["./bin/tartufo-helper", "doctor"]);
    expect(stdout).toEqual(expect.stringMatching(/Your system is ready to use Tartufo!/i));
  });
});
