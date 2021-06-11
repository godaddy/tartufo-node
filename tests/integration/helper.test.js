const { run, TARTUFO_HELPER } = require("./util");

describe("bin/tartufo-helper", () => {
  test("Run tartufo-helper doctor", async () => {
    const [stdout, stderr] = await run(TARTUFO_HELPER, ["doctor"]);
    expect(stdout).toEqual(expect.stringMatching(/Your system is ready to use Tartufo!/i));
  });
});
