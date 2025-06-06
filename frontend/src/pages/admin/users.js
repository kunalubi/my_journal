import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const Users = () => {
  const [users, setUsers] = useState({ admin: [], author: [], editor: [], reviewer: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('admin');
  const navigate = useNavigate();

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost/my_journal/backend/admin.php?action=get_users');
      const data = await response.json();

      if (data.success) {
        const grouped = ['admin', 'author', 'editor', 'reviewer'].reduce((acc, type) => {
          acc[type] = data.users.filter(u => (u.user_type || u.user_Type)?.toLowerCase() === type);
          return acc;
        }, {});
        setUsers(grouped);
      } else throw new Error(data.message || 'Failed to fetch users');
    } catch (error) {
      setError(error.message || 'Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = (user) => navigate('/admin/editprofile', { state: { user } });

  const renderUserCard = (user) => (
    <div className="col-md-4 col-lg-3 mb-4" key={user.login_id}>
      <div className="card border-0 h-100 shadow-sm" style={{ backgroundColor: '#E0F7FA', borderRadius: '16px' }}>
        <div className="card-body text-center p-4">
          <div className="position-relative mb-3">
            <img
              src={user.user_image ? `http://localhost/my_journal/public/${user.user_image}` : '/images/default.jpeg'}
              alt={user.First_Name}
              className="rounded-circle shadow-sm"
              style={{ width: '90px', height: '90px', objectFit: 'cover', border: '3px solid #b2ebf2' }}
            />
            <div className="position-absolute bottom-0 end-0 bg-info text-white rounded-circle p-1" style={{ fontSize: '0.7rem' }}>
              <i className="fas fa-user"></i>
            </div>
          </div>
          <h6 className="fw-semibold mb-1 text-dark">{user.First_Name}</h6>
          <p className="text-muted mb-2 small">{user.Email}</p>

          <div className="text-start mb-2 small">
            <p className="mb-1"><strong className="text-muted">Mobile:</strong> {user.Mobile}</p>
            <p className="mb-1"><strong className="text-muted">City:</strong> {user.City}</p>
            <p className="mb-1"><strong className="text-muted">State:</strong> {user.State}</p>
          </div>

          <button
            className="btn btn-sm"
            style={{
              backgroundColor: '#00ACC1',
              color: '#fff',
              borderRadius: '20px',
              padding: '6px 20px',
              fontWeight: '500',
            }}
            onClick={() => handleEditProfile(user)}
          >
            <i className="fas fa-edit me-1"></i> Edit
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabButtons = () => (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
      {['admin', 'author', 'editor', 'reviewer'].map((type) => (
        <button
          key={type}
          className={`btn ${selectedType === type ? 'btn-info' : 'btn-outline-info'}`}
          style={{ borderRadius: '20px', fontWeight: 500, minWidth: '120px' }}
          onClick={() => setSelectedType(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} ({users[type].length})
        </button>
      ))}
    </div>
  );

  const renderTabContent = (usersArr) => (
    <div className="row">
      {usersArr.length > 0 ? usersArr.map(renderUserCard) : (
        <div className="col-12 text-center">
          <p className="text-muted">No users found</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <Sidebar title="Users Profile">
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status" />
          <p className="mt-3 text-muted">Loading users...</p>
        </div>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar title="Users Profile">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-info" onClick={fetchUsers}>Try Again</button>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar title="Users Profile">
      <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#E0F7FA' }}>
        <div className="card-body">
          {renderTabButtons()}
          {renderTabContent(users[selectedType])}
        </div>
      </div>
    </Sidebar>
  );
};

export default Users;
