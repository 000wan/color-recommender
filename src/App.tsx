import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from './pages/PrivateRoute';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import Header from './components/header';
import './App.css';

const App = () => {
  const [ titleColor, setTitleColor ] = useState<string>('#000000');

  return (
    <div className="App">
      <BrowserRouter>
        <Header titleColor={ titleColor } />
        <Routes>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/" element={
            <PrivateRoute redirectPath='/login'>
              <MainPage setTitleColor={ setTitleColor }/>
            </PrivateRoute>
          }/>
          <Route path="/profile" element={
            <PrivateRoute redirectPath='/login'>
              <ProfilePage />
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
