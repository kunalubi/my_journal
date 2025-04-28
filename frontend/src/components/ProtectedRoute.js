import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Redirect to login if there's no user data
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user is trying to access the correct dashboard
  const currentPath = location.pathname;
  const userType = user.user_type;
  
  const allowedPaths = {
    'admin': '/admin-dashboard',
    'author': '/author-dashboard',
    'editor': '/editor-dashboard',
    'reviewer': '/reviewer-dashboard'
  };

  if (currentPath !== allowedPaths[userType]) {
    // Redirect to the correct dashboard if user tries to access wrong one
    return <Navigate to={allowedPaths[userType]} replace />;
  }

  return children;
};

export default ProtectedRoute; 