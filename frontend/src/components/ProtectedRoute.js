import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if route has specific role requirements
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    // Redirect to appropriate dashboard based on user type
    const dashboardPaths = {
      'admin': '/admin-dashboard',
      'author': '/author-dashboard',
      'editor': '/editor-dashboard',
      'reviewer': '/reviewer-dashboard'
    };
    
    // Redirect to user's dashboard or home if type not found
    const redirectPath = dashboardPaths[user.user_type] || '/';
    return <Navigate to={redirectPath} replace />;
  }

  // Check for dashboard-specific access
  const dashboardPaths = {
    '/admin-dashboard': 'admin',
    '/author-dashboard': 'author',
    '/editor-dashboard': 'editor',
    '/reviewer-dashboard': 'reviewer'
  };

  if (dashboardPaths[location.pathname] && dashboardPaths[location.pathname] !== user.user_type) {
    const redirectPath = {
      'admin': '/admin-dashboard',
      'author': '/author-dashboard',
      'editor': '/editor-dashboard',
      'reviewer': '/reviewer-dashboard'
    }[user.user_type] || '/';
    
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;