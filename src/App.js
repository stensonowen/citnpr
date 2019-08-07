import React from 'react';
import logo from './logo.svg';
import './App.css';
import cat from './categories.js';

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        stages: new Array(1,2,3,4,5,6),
    };
    this.state.stages[0] = new cat.Stage(cat.Politics, cat.Music, 5);

    //const board = new Board;
    const board = 4;
    this.state = { board };
  }

  reset(cat1, cat2) {
    //this.state.
  }

  

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
          lol Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
