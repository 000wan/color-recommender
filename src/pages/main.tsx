import React, { useState, useEffect } from 'react';
import LatticeGrid from '../components/Main/LatticeGrid';
import Palette from '../components/Main/Palette';
import FeedList from '../components/Sub/FeedList';
import './css/main.css';
import { auth } from '../tools/auth';
import { APIGetLog, APIGetRecommend } from '../tools/api';

interface MainPageProps {
  setTitleColor: (titleColor: string) => void
}

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}

interface FeedSchema {
  color: string,
  content: string
}

const MainPage = ({ setTitleColor }: MainPageProps) => {
  const [ username, setUsername ] = useState<string>('');
  const [ history, setHistory ] = useState<LogSchema[]>([]);
  const [ recommended, setRecommended ] = useState<string[]>([]);

  const [ pick, setPick ] = useState<string>('');
  const [ FBrushColor, setFBrushColor ] = useState<string>(''); // Foreground
  const [ BBrushColor, setBBrushColor ] = useState<string>(''); // Background

  useEffect(() => {
    auth().then(( data ) => {
      if( !data.isAuth ) { // token in cookie is not available
        document.cookie = "x_auth=; max-age=-1"; // delete x_auth cookie
      } else {
        setUsername(data.username);
      }
    });
    APIGetLog().then(( data ) => setHistory(data));
    APIGetRecommend().then(( data ) => setRecommended(data));
  }, []);

  const historyToFeed = (log: LogSchema) => {
    return {
      color: log.color,
      content: '⏱'+(new Date(log.timestamp).toTimeString().slice(0,8))
    } as FeedSchema
  }

  const recommendToFeed = (color: string, index: number) => {
    return {
      color: color,
      content: `#${index+1}`
    } as FeedSchema 
  }

  return (
    <div className='main'>
      <div className='main-block'>
        <h2 className='block-title'>History</h2>
        <FeedList data={ history.map(historyToFeed) } LClickEvent={(color: string) => setFBrushColor(color)} RClickEvent={(color: string) => setBBrushColor(color)} />
      </div>
      <div className='main-block'>
        <LatticeGrid pick={ pick } setHistory={ setHistory } setAverageColor={ setTitleColor } />
        <Palette setPick={ setPick } FBrushColor={ FBrushColor } BBrushColor={ BBrushColor } setFBrushColor={ setFBrushColor } setBBrushColor={ setBBrushColor } />
      </div>
      <div className='main-block'>
        <h2 className='block-title'>Recommended for You</h2>
        <FeedList data={ recommended.map(recommendToFeed) } LClickEvent={(color: string) => setFBrushColor(color)} RClickEvent={(color: string) => setBBrushColor(color)} />
      </div>

      <p>Welcome, {username}!</p>
    </div>
  );
}

export default MainPage;
