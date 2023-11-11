import { Token } from "./Token";
import { stringToTokens } from "./TokenUtils";

test("String to Token Mapping should work", () => {
    const TEST = "This is a test";
    let map = stringToTokens(TEST);
    let testToken = new Token(0, 4, "This", 0);
    expect(map.get(0)).toEqual(testToken);
    expect(map.size).toBe(4);
})

test("Empty String return empty map", () => {
    const TEST = "";
    let map = stringToTokens(TEST);
    expect(map.size).toBe(0);
})