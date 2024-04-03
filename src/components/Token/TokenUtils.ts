import { Token } from "./Token";


export function stringToTokens(input: string): Map<number, Token> {

    let tokenIdMap = new Map<number, Token>();
    if (input.length === 0) return tokenIdMap;
    let textSplit = input.split(" ");
    var startIndex = 0;
    for (let i = 0; i < textSplit.length; i++) {
        let endIndex = startIndex + textSplit[i].length;
        let newToken: Token = new Token(
            startIndex,
            endIndex,
            textSplit[i],
            i
        );
        tokenIdMap.set(i, newToken);
        startIndex = endIndex + 1;
    }
    return tokenIdMap;
}

