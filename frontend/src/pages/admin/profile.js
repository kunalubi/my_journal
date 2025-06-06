import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userFromState = location.state?.user;

    if (!userFromState) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          fetchUserData(parsedUser.login_id);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setError('Invalid user data');
          setLoading(false);
        }
      } else {
        setError('No user data found');
        setLoading(false);
      }
    } else {
      fetchUserData(userFromState.login_id);
    }
  }, [location]);

  const fetchUserData = async (loginId) => {
    try {
      const response = await fetch(`http://localhost/my_journal/backend/admin.php?login_id=${loginId}`);
      const data = await response.json();

      if (data.success) {
        setUserData(data.user);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          {error} <br /> Redirecting to login...
        </div>
      </div>
    );
  }

  return (
    <Sidebar title="Admin Dashboard">
     <div className="container mt-4 d-flex justify-content-center">
    <div
        className="card shadow-lg"
        style={{ borderRadius: "20px", overflow: "hidden", width: "100%", maxWidth: "900px", backgroundColor: "#ffffff" }}>
        <div className="row g-0">
        {/* Left side with user image */}
        <div
            className="col-md-4 d-flex flex-column align-items-center justify-content-center text-center p-4"
            style={{ backgroundColor: "#E6FFF2" }}
        >
            <img
            src="/images/logoo.jpg"
            alt="Profile"
            className="img-fluid rounded-circle mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #ffffff" }}
            />
            <h4 className="text-success mb-1">{userData?.user_name || 'N/A'}</h4>
            <p className="text-muted mb-3">Admin</p>
            <button
            className="btn btn-outline-success btn-sm px-4"
            onClick={() => navigate("/admin/editprofile")}
            >
            <i className="fas fa-edit me-1"></i>Edit
            </button>
        </div>

        {/* Right side with details */}
        <div className="col-md-8 p-4" style={{ backgroundColor: "#E6FFF2" }}>
            <h5 className="text-dark fw-bold mb-3">Profile Details</h5>
            <div className="row">
            <div className="col-sm-6 mb-3">
                <label className="fw-bold text-muted">Email:</label>
                <div className="border rounded px-3 py-2 bg-white">{userData?.Email || "Not provided"}</div>
            </div>
            <div className="col-sm-6 mb-3">
                <label className="fw-bold text-muted">Mobile:</label>
                <div className="border rounded px-3 py-2 bg-white">{userData?.Mobile || "Not provided"}</div>
            </div>
            <div className="col-sm-6 mb-3">
                <label className="fw-bold text-muted">City:</label>
                <div className="border rounded px-3 py-2 bg-white">{userData?.City || "Not provided"}</div>
            </div>
            <div className="col-sm-6 mb-3">
                <label className="fw-bold text-muted">State:</label>
                <div className="border rounded px-3 py-2 bg-white">{userData?.State || "Not provided"}</div>
            </div>
            <div className="col-sm-12 mb-3">
                <label className="fw-bold text-muted">Address:</label>
                <div className="border rounded px-3 py-2 bg-white">{userData?.Address || "Not provided"}</div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>

    </Sidebar>
  );
};

export default Profile;
