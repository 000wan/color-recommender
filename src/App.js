import React, { useState } from 'react';
import './App.css';
import LatticeGrid from './LatticeGrid';
import Palette from './Palette';

function App() {
  const [ pick, setPick ] = useState(null);

  return (
    <div className="App">
      <h1>Color Recommender</h1>
      <hr />
      <LatticeGrid pick={pick} />
      <br />
      <Palette setPick={setPick} />
    </div>
  );
}

export default App;
