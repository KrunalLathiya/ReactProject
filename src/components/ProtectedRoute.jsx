import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  // Directly return either the Component or Navigate based on isAuthenticated
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;