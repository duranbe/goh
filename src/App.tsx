import "./App.css";
import { useState } from "react";
import { Token, TokenComponent } from "./components/Token/Token";
import { stringToTokens } from "./components/Token/TokenUtils";

export default function App() {
  const [selectedToken, setSelectedToken] = useState<Token[]>([]);
  const text =
    "I'm Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc.";
  const csvFileHeaders = "id,tokenStartIndex,tokenEndIndex,value\n";
  const tokenIdMap = stringToTokens(text);
  const tokenAlreadyinData = (token: Token) => {
    return selectedToken.some((item: Token) => item.id === token.id);
  };

  const download = () => {
    let csvFileContent = selectedToken
      .map((token) => {
        return token.toCSVFormat();
      })
      .join("");
    const csvContent = `data:text/csv;charset=utf-8,${csvFileHeaders}${csvFileContent}`;
    const encodedURI = encodeURI(csvContent);
    window.open(encodedURI);
  };

  function handleMouseUp() {
    const eleme = window.getSelection()?.getRangeAt(0).cloneContents().children;
    let tokenArray: Token[] = [];
    const tokenClassName =
      "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
    if (eleme && eleme.length > 0) {
      for (var i = 0; i < eleme.length; i++) {
        let token = document.getElementById(eleme[i].id);
        if (token && token.id) {
          let t = Number(token.id);
          let v = tokenIdMap.get(t);
          if (v && !tokenAlreadyinData(v)) {
            tokenArray.push(v);
            token.className = tokenClassName;
          }
        }
      }
      setSelectedToken(selectedToken.concat(tokenArray));
    } else if (eleme) {
      const parentNode = window.getSelection()?.getRangeAt(0)
        ?.startContainer?.parentNode;
      //@ts-ignore
      const singleTokenId = parentNode?.id;
      var singleToken = document.getElementById(singleTokenId);
      if (singleToken) {
        let t = Number(singleToken.id);
        let v = tokenIdMap.get(t);
        if (v && !tokenAlreadyinData(v)) {
          tokenArray.push(v);
          singleToken.className = tokenClassName;
          setSelectedToken(selectedToken.concat(tokenArray));
        } else if (v) {
          setSelectedToken(selectedToken.filter((token) => token.id !== v.id));
          singleToken.className = "px-0.5 font-mono";
        }
      }
    }
  }

  return (
    <div className="App px-4 py-2">
      <div className="text-white mx-4 my-2">Input</div>
      <div
        className="bg-slate-800 rounded-lg px-4 py-2 m-4 text-white text-lg"
        onMouseUp={handleMouseUp}
      >
        {text.split(" ").map((token, index) => (
          <span key={index} id={String(index)} className="px-0.5 font-mono">
            {token}
          </span>
        ))}
      </div>
      <div className="text-white mx-4 my-2">Selected Tokens</div>
      <div className="rounded-lg m-4 text-white text-md">
        {selectedToken
          .sort((a, b) => a.id - b.id)
          .map((val) => (
            <span>
              <TokenComponent token={val} />
            </span>
          ))}
      </div>

      <div className="flex justify-end px-4">
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded-md"
          onClick={download}
        >
          Download
        </button>
      </div>
    </div>
  );
}
