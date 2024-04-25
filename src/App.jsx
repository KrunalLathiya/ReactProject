import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './custom.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import Index from './components/Index';

import SignUpForm from './components/auth/SignUpForm';
import LoginForm from './components/auth/LoginForm';

import ProtectedRoute from './components/ProtectedRoute';
import isAuthenticated from './services/authService';

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<ProtectedRoute component={Create} isAuthenticated={isAuthenticated} />} />
            <Route path="/edit/:id" element={<ProtectedRoute component={Edit} isAuthenticated={isAuthenticated} />} />
            <Route path="/index" element={<ProtectedRoute component={Index} isAuthenticated={isAuthenticated} />} />
            <Route path="/signup" element={<ProtectedRoute component={SignUpForm} isAuthenticated={isAuthenticated} redirectPath="/index" />} />
            <Route path="/login" element={<ProtectedRoute component={LoginForm} isAuthenticated={isAuthenticated} redirectPath="/index" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;