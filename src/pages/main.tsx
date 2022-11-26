import React, { useState } from 'react';
import LatticeGrid from '../components/Main/LatticeGrid';
import Palette from '../components/Main/Palette';
import { auth } from '../tools/auth';
import './css/main.css';

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
    <div className="main">
      <br />
      <LatticeGrid pick={ pick } setAverageColor={ setTitleColor } />
      <br />
      <Palette setPick={ setPick } />
      <br />
      Welcome, {username}!
    </div>
  );
}

export default MainPage;
