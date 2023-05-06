import './App.css';
import { useState } from 'react';
import { Token } from './components/Token';

export default function App() {

  const [selectedToken, setSelectedToken] = useState<Token[]>([]);
  const tokenIdMap = new Map<number, Token>();
  const tokenAlreadyinData = (token: Token) => { return selectedToken.some((item: Token) => item.id === token.id)}

  function handleMouseUp() {

    const eleme = window.getSelection()?.getRangeAt(0).cloneContents().children;
    let tokenArray: Token[] = [];

    if (eleme && eleme.length > 0) {

      for (var i = 0; i < eleme.length; i++) {
        let token = document.getElementById(eleme[i].id);
        if (token && token.id) {
          token.className = "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
          let t = Number(token.id)
          let v = tokenIdMap.get(t);
          if (v && !tokenAlreadyinData(v)) {
            tokenArray.push(v);
          }


        }

      }

    } else if (eleme) {
      const parentNode = window.getSelection()?.getRangeAt(0)?.startContainer?.parentNode
      //@ts-ignore
      const singleTokenId = parentNode?.id;
      var singleToken = document.getElementById(singleTokenId);
      if (singleToken) {
        singleToken.className = "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
        let t = Number(singleToken.id)
        let v = tokenIdMap.get(t);
        if (v && !tokenAlreadyinData(v)) {
          tokenArray.push(v);
        }


      }

    }

    setSelectedToken(selectedToken.concat(tokenArray));
  }

  let text = "I'm Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc."
  let textSplit = text.split(" ");

  let tokenArray: Token[] = [];
  var startIndex = 0;
  for (let i = 0; i < textSplit.length; i++) {
    let newToken = {
      startIndex: startIndex,
      endIndex: startIndex + textSplit[i].length,
      tokenValue: textSplit[i],
      id: i
    }
    tokenArray.push(newToken)
    tokenIdMap.set(i, newToken)
    startIndex = startIndex + textSplit[i].length + 1
  }

  return (
  <div className="App">
    <div className='text-white mx-12 my-2 text-lg' onMouseUp={handleMouseUp} >
      {text.split(" ").map((token, index) => (<span key={index} id={String(index)} className="px-0.5 font-mono" >{token}</span>))}
    </div>

    <div className='text-white mx-8 my-2' >
      {selectedToken.map((val) => (<span key={val.id}>{val.tokenValue} </span>))}
    </div>

  </div>

  )



}


