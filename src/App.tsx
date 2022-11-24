import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/main';
import LoginPage from './pages/login';
import Header from './components/header';
import './App.css';

const App = () => {
  const [ titleColor, setTitleColor ] = useState<string>('#000000');

  return (
    <div className="App">
      <Header titleColor={ titleColor } />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/" element={ <MainPage setTitleColor={ setTitleColor }/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
