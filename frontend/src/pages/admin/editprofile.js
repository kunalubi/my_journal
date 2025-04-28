import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        user_name: '',
        Email: '',
        Mobile: '',
        Address: '',
        City: '',
        State: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost/my_journal/backend/admin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update_profile',
                    ...userData
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Profile updated successfully!');
                // Update localStorage with new data
                const storedUser = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({
                    ...storedUser,
                    ...userData
                }));
            } else {
                throw new Error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
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
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Edit Profile</h2>
                </div>
                <div className="card-body">
                    {success && (
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="user_name"
                                        value={userData.user_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="Email"
                                        value={userData.Email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Mobile:</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="Mobile"
                                        value={userData.Mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Address:</label>
                                    <textarea
                                        className="form-control"
                                        name="Address"
                                        value={userData.Address}
                                        onChange={handleChange}
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">City:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="City"
                                        value={userData.City}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">State:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="State"
                                        value={userData.State}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/profile')}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
