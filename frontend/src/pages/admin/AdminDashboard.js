import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  const EditProfile = () => {
    navigate('/admin/profile');
  };

  return (
    <div className="vh-100">
      <div className="d-flex justify-content-between align-items-center p-3 bg-light">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        <button className="btn btn-warning" onClick={EditProfile}>Profile</button>
      </div>
      <div className="row h-100 m-0">
        <div className="col-2 p-0">
          <Sidebar />
        </div>
        <div className="col-10 p-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Welcome, {user?.user_name}</h5>
              <p className="card-text">This is the admin dashboard where you can manage all aspects of the system.</p>
              {/* Add admin-specific features here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 