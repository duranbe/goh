import { Token } from "./Token";


test("Correct CSV Format", () => {
    let testToken: Token = new Token(1,5,"test",11);
    const result: string ='11,1,5,test\n';
    expect(testToken.toCSVFormat()).toEqual(result);

})