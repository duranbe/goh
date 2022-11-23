import './App.css';
import { useState } from 'react';

export default function App() {

  const [data, setData] = useState({ words: [] });


  function handleMouseUp() {
    
    const eleme = window.getSelection().getRangeAt(0).cloneContents().children;

    if (eleme.length > 0) {
      let tokenArray = []
      for (var i = 0; i < eleme.length; i++) {
        let token = document.getElementById(eleme[i].id);
        token.className = "px-0.5 underline decoration-sky-500 font-mono";
        tokenArray.push(token)
      }
      
      setData({ ...data, words: data.words.concat(tokenArray) })

    } else {
      const singleTokenId = window.getSelection().getRangeAt(0).startContainer.parentNode.id;
      var singleToken = document.getElementById(singleTokenId);
      singleToken.className = "px-0.5 underline decoration-sky-500 font-mono";

      setData({ ...data, words: data.words.concat([singleToken]) })

    }

  }

  let text = "I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc."

  return (
    <div className="App">
      <div className='text-white mx-8 my-2' onMouseUp={handleMouseUp}>
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
