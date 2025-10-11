import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Diary from './components/Diary';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/diary" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/diary" /> : <Signup />} />
        <Route path="/diary" element={token ? <Diary /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
