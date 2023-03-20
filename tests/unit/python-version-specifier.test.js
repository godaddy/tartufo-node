const { validate } = require("../../lib/python-version-specifier");

describe("python-version-specifier", () => {
  test("Validates Compatible Release clause (~=)", async () => {
    expect(validate("~=0.9")).toStrictEqual(true);
    expect(validate("~=2014.3")).toStrictEqual(true);
    expect(validate("~=1.2.3beta1")).toStrictEqual(true);
    expect(validate("~=1.2.pre3.test4")).toStrictEqual(true);
  });
  test("Validates Version Matching clause (==)", async () => {
    expect(validate("==1.2.3")).toStrictEqual(true);
    expect(validate("==2012.4")).toStrictEqual(true);
    expect(validate("==1.2.3alpha1")).toStrictEqual(true);
    expect(validate("==1.2.pre3.dev4")).toStrictEqual(true);
  });
  test("Validates Version Exclusion clause (!=)", async () => {
    expect(validate("!=1.2.3")).toStrictEqual(true);
    expect(validate("!=2012.4")).toStrictEqual(true);
    expect(validate("!=1.2.3alpha1")).toStrictEqual(true);
    expect(validate("!=1.2.post3.dev4")).toStrictEqual(true);
  });
  test("Validates Inclusive Ordered Comparison clause (>=, <=)", async () => {
    expect(validate(">=1.2.3")).toStrictEqual(true);
    expect(validate(">=2012.4")).toStrictEqual(true);
    expect(validate(">=1.2.3alpha1")).toStrictEqual(true);
    expect(validate(">=1.2.post3.dev4")).toStrictEqual(true);
    expect(validate("<=1.2.3")).toStrictEqual(true);
    expect(validate("<=2012.4")).toStrictEqual(true);
    expect(validate("<=1.2.3alpha1")).toStrictEqual(true);
    expect(validate("<=1.2.post3.dev4")).toStrictEqual(true);
  });
  test("Validates Exclusive Ordered Comparison clause", async () => {
    expect(validate(">1.2.3")).toStrictEqual(true);
    expect(validate(">2012.4")).toStrictEqual(true);
    expect(validate(">1.2.3alpha1")).toStrictEqual(true);
    expect(validate(">1.2.post3.dev4")).toStrictEqual(true);
  });
  test("Validates Arbitrary Equality clause", async () => {
    expect(validate("===1.2.3")).toStrictEqual(true);
    expect(validate("===2012.4")).toStrictEqual(true);
    expect(validate("===1.2.3alpha1")).toStrictEqual(true);
    expect(validate("===1.2.post3.dev4")).toStrictEqual(true);
  });
  test("Validates compound specifiers", async () => {
    expect(validate("===1.2.3, >1.2.3, <=1.2.3, !=1.2.3alpha1, ==1.2.pre3.dev4, ~=1.2.pre3.test4")).toStrictEqual(true);
  });
  test("Rejects specifier without a clause", async () => {
    expect(validate("0.9")).toStrictEqual(false);
    expect(validate("2014.3")).toStrictEqual(false);
    expect(validate("1.2.3beta1")).toStrictEqual(false);
    expect(validate("1.2.pre3.test4")).toStrictEqual(false);
  });
  test("Rejects invalid specifier with a valid clause", async () => {
    expect(validate("~=.9")).toStrictEqual(false);
    expect(validate("==.2.3")).toStrictEqual(false);
    expect(validate("!=.2.3")).toStrictEqual(false);
    expect(validate(">.2.3")).toStrictEqual(false);
    expect(validate("===.2.3")).toStrictEqual(false);
  });
  test("Rejects compound specifiers with trailing commas", async () => {
    expect(validate("===1.2.3, >1.2.3, <=1.2.3,")).toStrictEqual(false);
  });
  test("Rejects compound specifiers with leading commas", async () => {
    expect(validate(",===1.2.3, >1.2.3, <=1.2.3")).toStrictEqual(false);
  });
  test("Rejects compound specifiers with missing commas", async () => {
    expect(validate("===1.2.3 >1.2.3, <=1.2.3")).toStrictEqual(false);
  });
  test("Rejects equality clause with too many = signs", async () => {
    expect(validate("====1.2.3")).toStrictEqual(false);
    expect(validate("====2012.4")).toStrictEqual(false);
    expect(validate("====1.2.3alpha1")).toStrictEqual(false);
    expect(validate("====1.2.post3.dev4")).toStrictEqual(false);
  });
  test("Rejects equality clause with too few = signs", async () => {
    expect(validate("=1.2.3")).toStrictEqual(false);
    expect(validate("=2012.4")).toStrictEqual(false);
    expect(validate("=1.2.3alpha1")).toStrictEqual(false);
    expect(validate("=1.2.post3.dev4")).toStrictEqual(false);
  });
});
