import './App.css';
import { useState } from 'react';
import Token from './components/Token';

export default function App() {

  const [data, setData] = useState({ words: [] });


  function handleMouseUp() {
    
    const eleme = window.getSelection().getRangeAt(0).cloneContents().children;

    if (eleme.length > 0) {
      let tokenArray = []
      for (var i = 0; i < eleme.length; i++) {
        let token = document.getElementById(eleme[i].id);
        token.className = "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
        tokenArray.push(token)
      }
      
      setData({ ...data, words: data.words.concat(tokenArray) })

    } else {
      const singleTokenId = window.getSelection().getRangeAt(0).startContainer.parentNode.id;
      var singleToken = document.getElementById(singleTokenId);
      singleToken.className = "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
      setData({ ...data, words: data.words.concat([singleToken]) })

    }
  }

  let text = "I'm Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc."
  let textSplit = text.split(" ");

  let tokenArray = [];
  var startIndex = 0;
  for(let i = 0;i<textSplit.length;i++){
    tokenArray.push(new Token(startIndex,startIndex+textSplit[i].length,textSplit[i],))
    startIndex = startIndex+textSplit[i].length+1
  }

  console.log(tokenArray)

  return (
    <div className="App">
      <div className='text-white mx-8 my-2 text-lg' onMouseUp={handleMouseUp}>
        {text.split(" ").map((token, index) => (
          <span key={index} id={index} className="px-0.5 font-mono" >{token}</span>
        ))
        }
      </div>
      <div className='text-white mx-8 my-2'>
        {data.words.map((val) => (<span key ={val.id}> {val.innerText} </span>))}
      </div>
    </div>
  );
}


