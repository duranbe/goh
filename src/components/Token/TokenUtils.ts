import { Token } from "./Token";


export function wordsToToken(input: string): Token[] {


    let tokenWordsList: Token[] = [];

    if(input.length === 0 ) return tokenWordsList;
    let textSplit = input.split(" ");
    var startIndex = 0;
    for (let i = 0; i < textSplit.length; i++) {
        let endIndex = startIndex + textSplit[i].length;
        let newToken: Token = new Token(
            startIndex,
            endIndex,
            textSplit[i],
            crypto.randomUUID()
        );
        
        tokenWordsList.push(newToken);
        startIndex = endIndex + 1;
    }

    return tokenWordsList;

}
