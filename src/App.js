import React, { useState } from 'react';
import './App.css';
import LatticeGrid from './LatticeGrid';
import Palette from './Palette';

function App() {
  const [ pick, setPick ] = useState(null);
  const [ averageColor, setAverageColor ] = useState('#000000');

  return (
    <div className="App">
      <h1 style={{color: averageColor}}>Color Recommender</h1>
      <hr />
      <LatticeGrid pick={pick} setAverageColor={setAverageColor} />
      <br />
      <Palette setPick={setPick} />
    </div>
  );
}

export default App;
