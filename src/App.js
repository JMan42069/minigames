import logo from './logo.svg';
import './App.css';
import { SudokuBoard } from'./components/sudoku';
import { useState } from 'react';

function App() {
  const [seed, setSeed] = useState(null) 
  function reset(){
    setSeed(Math.random())
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h3>Minigames!!!</h3>
      <div>

        <SudokuBoard val={seed}/>
        <button onClick={() => reset()}>New Game</button>
      </div>
    </div>
  );
}

export default App;
