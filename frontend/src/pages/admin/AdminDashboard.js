import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar';

const AdminDashboard = () => {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <Sidebar title="Admin Dashboard">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">Welcome, {user?.user_name}</h5>
          <p className="card-text">This is the admin dashboard where you can manage all aspects of the system.</p>
          {/* Add admin-specific features here */}
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminDashboard;