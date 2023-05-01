import './App.css';
import { useState } from 'react';
import { Token } from './components/Token';
import React from 'react';

export default function App() {

  const [data, setData] = useState<HTMLElement[]>([]);

  // eslint-disable-next-line
  function checkIfTokenAlreadyinData(token: Token) {

  }


  function handleMouseUp() {


    const eleme = window.getSelection()?.getRangeAt(0).cloneContents().children;


    if (eleme && eleme.length > 0) {
      let tokenArray: HTMLElement[] = [];
      for (var i = 0; i < eleme.length; i++) {
        let token = document?.getElementById(eleme[i].id);
        if (token) {
          token.className = "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
          tokenArray.push(token)
        }

      }

      setData(data.concat(tokenArray));

    } else if (eleme) {
      const parentNode = window.getSelection()?.getRangeAt(0)?.startContainer?.parentNode
      const singleTokenId = parentNode?.id;
      var singleToken = document.getElementById(singleTokenId);
      if (singleToken) {
        singleToken.className = "px-0.5 underline decoration-sky-500 font-mono underline-offset-4 decoration-2";
        setData(data.concat([singleToken]));

      }
      
    }
  }

  let text = "I'm Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc."
  let textSplit = text.split(" ");

  let tokenArray: Token[] = [];
  var startIndex = 0;
  for (let i = 0; i < textSplit.length; i++) {
    tokenArray.push(
      {
        startIndex: startIndex,
        endIndex: startIndex + textSplit[i].length,
        tokenValue: textSplit[i]
      }
    )
    startIndex = startIndex + textSplit[i].length + 1
  }

  return( <div  className= "App" >Test
             <div className='text-white mx-8 my-2 text-lg' onMouseUp = { handleMouseUp } >
                {
                  text.split(" ").map((token, index) => (
                    <span key= { index } id = { String(index) } className = "px-0.5 font-mono" > { token } </span>
                  ))
                }
              </div>

      <div className = 'text-white mx-8 my-2' >
        {
          data.map((val) => (
          <span key = { val.id } > { val.innerText } </span>
          ))
        }
      </div>
  
  </div>
  
  )

/*

  return (
    <div className= "App" >


      <div className='text-white mx-8 my-2 text-lg' onMouseUp = { handleMouseUp } >
      {
        text.split(" ").map((token, index) => (
          <span key= { index } id = { index } className = "px-0.5 font-mono" > { token } < /span>
        ))
      }</div>
        
        
    < /div>
        
    );


    */
}


