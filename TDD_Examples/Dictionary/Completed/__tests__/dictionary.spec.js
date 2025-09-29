import { dictionary } from '../dictionary.js';

describe("dictionary", () => {
  test("should return an empty object for an empty string", () => {
    expect(dictionary('')).toEqual({});
  });

  test("should count 1 for one word", () => {
    const result = dictionary('the');    
    expect(result).toEqual({the : 1});
  });

  test("should count 2 for two words that are same", () => {
    const result = dictionary('the the');    
    expect(result).toEqual({the : 2});
  });
  test("should count 2 for two words that are same and 1 for other different word", () => {
    const result = dictionary('the word the');    
    expect(result).toEqual({the : 2, word : 1});
  });
});