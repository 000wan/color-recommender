import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/main';
import LoginPage from './pages/login';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/" element={ <MainPage/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
