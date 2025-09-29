import { example } from "../example.js";

// beforeAll(() => {
//   console.log("Before all tests");
// });

// afterAll(() => {
//   console.log("After all tests");
// });

// beforeEach(() => {
//   console.log("Before Each tests");
// });

// afterEach(() => {
//   console.log("After Each tests");
// });

describe("Our example module", () => {
  test("example test", () => {
    expect(example).toBeDefined();
  });

  test("typeof example should be object", () => {
    expect(typeof example).toEqual("object");
  });
  test("test hello function of our method", () => {
    const name = "Premal";
    const expected = example.Hello(name);
    expect(expected).toEqual("Hello, Premal!");
  });

});