import React, { useState } from 'react';
import axios from "axios";
import { APIBase } from '../tools/api';
import LatticeGrid from '../components/Main/LatticeGrid';
import Palette from '../components/Main/Palette';
import { useInterval } from '../tools/interval';

const MainPage = (props: {}) => {
  const [ pick, setPick ] = useState<string>('');
  const [ averageColor, setAverageColor ] = useState<string>('#000000');

  const [ serverConnected, setServerConnected ] = useState<boolean>(false);
  useInterval(()=>{
    interface APIStatus { isOnline: boolean };
    const asyncFun = async () => {
      const res = await axios.get<APIStatus>(APIBase + "/status");
      setServerConnected(res.data.isOnline);
    }
    asyncFun().catch((e) => setServerConnected(false));
  }, 5000);

  return (
    <div className="main">
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

export default MainPage;
