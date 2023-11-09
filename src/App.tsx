import "./App.css";
import { useState } from "react";
import { Token } from "./components/Token";
import { stringToTokens } from "./components/TokenUtils";

export default function App() {
  const [selectedToken, setSelectedToken] = useState<Token[]>([]);
  const text = "I'm Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc.";
  const csvFileHeaders = "id,tokenStartIndex,tokenEndIndex,value\n";
  const tokenIdMap = stringToTokens(text)
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
          token.className = tokenClassName;
          let t = Number(token.id);
          let v = tokenIdMap.get(t);
          if (v && !tokenAlreadyinData(v)) {
            tokenArray.push(v);
          }
        }
      }
    } else if (eleme) {
      const parentNode = window.getSelection()?.getRangeAt(0)
        ?.startContainer?.parentNode;
      //@ts-ignore
      const singleTokenId = parentNode?.id;
      var singleToken = document.getElementById(singleTokenId);
      if (singleToken) {
        singleToken.className = tokenClassName;
        let t = Number(singleToken.id);
        let v = tokenIdMap.get(t);
        if (v && !tokenAlreadyinData(v)) {
          tokenArray.push(v);
        }
      }
    }

    setSelectedToken(selectedToken.concat(tokenArray));
  }

  return (
    <div className="App px-4 py-2">
      <div className="text-white mx-12 my-2 text-lg" onMouseUp={handleMouseUp}>
        {text.split(" ").map((token, index) => (
          <span key={index} id={String(index)} className="px-0.5 font-mono">
            {token}
          </span>
        ))}
      </div>

      <div className="text-white mx-8 my-2">
        {selectedToken.map((val) => (
          <span className="px-1" key={val.id}>
            {val.tokenValue}
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
