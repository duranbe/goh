import "./App.css";
import { useState } from "react";
import { Token, TokenComponent } from "./components/Token/Token";
import { stringToTokens } from "./components/Token/TokenUtils";
import { DownloadComponent } from "./components/Download";

export default function App() {
  const sampleText = "This is a sample text, upload a txt file to get started.";
  const [selectedToken, setSelectedToken] = useState<Token[]>([]);
  const [text, setText] = useState<string>(sampleText);

  var tokenIdMap = stringToTokens(text);
  const tokenAlreadyinData = (token: Token) => {
    return selectedToken.some((item: Token) => item.id === token.id);
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
          let v = tokenIdMap.get(Number(token.id));
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
        let v = tokenIdMap.get(Number(singleToken.id));
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

  function onFileUpload() {
    var inputElement = document.getElementById("file_input") as HTMLInputElement;
    if(!inputElement || !inputElement.files) return ;
    var file = inputElement.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var content = reader.result as string;
        if (content) {
          setText(content);
          stringToTokens(content);
        }
      };

      reader.readAsText(file);
    }
  }

  return (
    <div className="App px-4 py-2">
      <div className="text-white mx-4 my-2">
        Input
        <div className="mx-2 my-2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={onFileUpload}
          ></input>
        </div>
      </div>

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
      <DownloadComponent content={selectedToken} />
    </div>
  );
}
