import React, { useState, useEffect } from 'react';
import LatticeGrid from '../components/Main/LatticeGrid';
import Palette from '../components/Main/Palette';
import UserHistory from '../components/Sub/UserHistory';
import './css/main.css';
import { auth } from '../tools/auth';
import { APIGetLog } from '../tools/api';

interface MainPageProps {
  setTitleColor: (titleColor: string) => void
}

interface LogSchema {
  index: number,
  color: string,
  timestamp: Date
}

const MainPage = ({ setTitleColor }: MainPageProps) => {
  const [ pick, setPick ] = useState<string>('');
  const [ history, setHistory ] = useState<LogSchema[]>([]);
  const [ username, setUsername ] = useState<string>('');

  useEffect(() => {
    auth().then(( data ) => {
      if( !data.isAuth ) { // token in cookie is not available
        document.cookie = "x_auth=; max-age=-1"; // delete x_auth cookie
      } else {
        setUsername(data.username);
      }
    });
    APIGetLog().then(( data ) => setHistory(data));
  }, []);

  return (
    <div className='main'>
      <div className='main-block'>
        <h2 className='block-title'>History</h2>
        <UserHistory history={ history } />
      </div>
      <div className='main-block'>
        <LatticeGrid pick={ pick } setHistory={ setHistory } setAverageColor={ setTitleColor } />
        <Palette setPick={ setPick } />
      </div>
      <div className='main-block'>
        <h2 className='block-title'>Recommend for You</h2>
        <div className='sub-content'>

        </div>
      </div>

      <p>Welcome, {username}!</p>
    </div>
  );
}

export default MainPage;
