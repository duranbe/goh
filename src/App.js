import './App.css';

export default function App() {

  function handleMouseUp() {
    const eleme = window.getSelection().getRangeAt(0).cloneContents().children;
    console.log(window.getSelection().getRangeAt(0).startContainer.parentNode.id);
    console.log("Nb Eleem : " + eleme.length);
  }

  let text = "I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc."

  return (
    <div className="App">
      <div className='text-white mx-8 my-2' onMouseUp={handleMouseUp}>
        {text.split(" ").map((token) => (
          <span> {token}</span>
        ))
        }
      </div>
    </div>
  );
}
