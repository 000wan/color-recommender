import React, { useState } from 'react';
import axios from "axios";
import { APIBase } from './tools/api';
import './App.css';
import LatticeGrid from './components/LatticeGrid';
import Palette from './components/Palette';
import { useInterval } from './tools/interval';

function App() {
  const [ pick, setPick ] = useState(null);
  const [ averageColor, setAverageColor ] = useState('#000000');

  const [ serverConnected, setServerConnected ] = useState(false);
  useInterval(()=>{
    const asyncFun = async () => {
      const res = await axios.get(APIBase + "/status");
      setServerConnected(res.data.isOnline);
    }
    asyncFun().catch((e) => setServerConnected(false));
  }, 5000);

  return (
    <div className="App">
      <h1 style={{color: averageColor}}>Color Recommender</h1>
      <hr />
      <LatticeGrid pick={pick} setAverageColor={setAverageColor} />
      <br />
      <Palette setPick={setPick} />
      <br />
      {serverConnected ? <p>Server Connected!</p> : <p>Server Disconnected.</p>}
    </div>
  );
}

export default App;
