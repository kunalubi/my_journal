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
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger text-center" role="alert">
                    {error} <br /> Redirecting to login...
                </div>
            </div>
        );
    }

    return (
        <Sidebar title="Admin Dashboard">
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">User Profile</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Username:</label>
                                <p className="form-control-plaintext">{userData.user_name || 'Not provided'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Email:</label>
                                <p className="form-control-plaintext">{userData.Email || 'Not provided'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Mobile:</label>
                                <p className="form-control-plaintext">{userData.Mobile || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Address:</label>
                                <p className="form-control-plaintext">{userData.Address || 'Not provided'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">City:</label>
                                <p className="form-control-plaintext">{userData.City || 'Not provided'}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">State:</label>
                                <p className="form-control-plaintext">{userData.State || 'Not provided'}</p>
                            </div>
                            <button className="btn btn-primary" onClick={() => navigate('/admin/editprofile')}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Sidebar>
    );
};

export default Profile;
