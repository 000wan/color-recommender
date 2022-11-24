import React, { useState } from 'react';
import axios from 'axios';
import { APIBase } from '../tools/api';
import LatticeGrid from '../components/Main/LatticeGrid';
import Palette from '../components/Main/Palette';
import { useInterval } from '../tools/interval';
import './css/main.css';

interface MainPageProps {
  setTitleColor: (titleColor: string) => void
}

const MainPage = ({ setTitleColor }: MainPageProps) => {
  const [ pick, setPick ] = useState<string>('');

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
      <br />
      <LatticeGrid pick={ pick } setAverageColor={ setTitleColor } />
      <br />
      <Palette setPick={ setPick } />
      <br />
      {serverConnected ? <p>Server Connected!</p> : <p>Server Disconnected.</p>}
    </div>
  );
}

export default MainPage;
