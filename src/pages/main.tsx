import React, { useState } from 'react';
import LatticeGrid from '../components/Main/LatticeGrid';
import Palette from '../components/Main/Palette';
import UserHistory from '../components/Sub/UserHistory';
import './css/main.css';
import { auth } from '../tools/auth';

interface MainPageProps {
  setTitleColor: (titleColor: string) => void
}

const MainPage = ({ setTitleColor }: MainPageProps) => {
  const [ pick, setPick ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');

  auth().then(( data ) => {
    if( !data.isAuth ) { // token in cookie is not available
      document.cookie = "x_auth=; max-age=-1"; // delete x_auth cookie
    } else {
      setUsername(data.username);
    }
  });

  return (
    <div className='main'>
      <div className='main-block'>
        <h2 className='block-title'>History</h2>
        <UserHistory />
      </div>
      <div className='main-block'>
        <LatticeGrid pick={ pick } setAverageColor={ setTitleColor } />
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
