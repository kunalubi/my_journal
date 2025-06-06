import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    // console.log("User data:", parsedUser); // <- check this
    setUser(parsedUser);
    }
  }, []);

  return (
    <Sidebar title="Admin Dashboard">
      <div
        className="card"
        style={{
          backgroundColor: '#E0F7FA',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: 'none',
          margin: '0 auto',
        }}
      >
        <div className="card-body">
          <h3 className="fw-bold text-dark mb-3">
            Welcome{user?.First_Name ? `, ${user.First_Name}` : ''}!
          </h3>
          <p className="text-secondary" style={{ fontSize: '16px' }}>
            This is your admin dashboard where you can manage users, pages, and content with full control. Use the sidebar to navigate.
          </p>
        </div>
      </div>
    </Sidebar>

  );
};

export default AdminDashboard;
