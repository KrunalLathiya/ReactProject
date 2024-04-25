import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, redirectPath = "/login", ...rest }) => {
  const authStatus = isAuthenticated();

  // Determine redirect based on auth status and intended redirect path
  if (authStatus && redirectPath === "/index") {
    return <Navigate to="/index" replace />;
  } else if (!authStatus && redirectPath === "/login") {
    return <Navigate to="/login" replace />;
  } else if (!authStatus && redirectPath === "/signup") {
    return <Navigate to="/signup" replace />;
  }

  // If no need to redirect, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
