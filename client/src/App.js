import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import Registration from './components/Registration/Registration';
import './App.css';
import LoginPage from './components/Registration/LoginPage';

function App() {
  return (
    <div>
      <Navbar />
      <Registration />
      <LoginPage />
      
    </div>
  );
}

export default App;
