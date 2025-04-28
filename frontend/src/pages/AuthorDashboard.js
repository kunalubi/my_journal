import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, message } = location.state || {};

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Author Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      <div className="alert alert-success">{message}</div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome, {user?.user_name}</h5>
          <p className="card-text">This is the author dashboard where you can manage your articles and submissions.</p>
          {/* Add author-specific features here */}
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard; 