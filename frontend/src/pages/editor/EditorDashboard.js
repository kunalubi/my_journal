import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditorDashboard = () => {
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
        <h2>Editor Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      <div className="alert alert-success">{message}</div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome, {user?.user_name}</h5>
          <p className="card-text">This is the editor dashboard where you can manage article submissions and reviews.</p>
          {/* Add editor-specific features here */}
        </div>
      </div>
    </div>
  );
};

export default EditorDashboard; 