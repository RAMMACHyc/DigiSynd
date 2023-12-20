import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import AuthComponent from './components/Auth/AuthComponent';
import './app.css';

const App = () => {
  const isRegistered = localStorage.getItem('profile');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isRegistered ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
