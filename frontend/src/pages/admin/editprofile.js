import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const EditProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        user_name: '',
        Email: '',
        Mobile: '',
        Address: '',
        City: '',
        State: '',
        user_image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        const userFromState = location.state?.user;
        if (!userFromState) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    fetchUserData(parsedUser.login_id);
                } catch (error) {
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
                if (data.user.user_image) {
                    setPreviewUrl(`http://localhost/my_journal/public/${data.user.user_image}`);
                }
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formData = new FormData();

            Object.keys(userData).forEach(key => {
                formData.append(key, userData[key]);
            });

            if (selectedImage) {
                formData.append('user_image', selectedImage);
            }
            formData.append('action', 'update_profile');

            const response = await fetch('http://localhost/my_journal/backend/admin.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Profile updated successfully!');
                if (data.user.user_image) {
                    setPreviewUrl(`http://localhost/my_journal/public/${data.user.user_image}`);
                }
                const storedUser = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({
                    ...storedUser,
                    ...userData,
                    user_image: data.user.user_image
                }));
            } else {
                throw new Error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status" style={{ color: '#2e7d32' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-secondary">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <Sidebar title="Admin Dashboard">
            <div className="container mt-4">
                <div className="card shadow-sm" style={{ borderRadius: '12px', border: '1px solid #c8e6c9' }}>
                    <div
                        className="card-header text-white"
                        style={{ backgroundColor: '#2e7d32', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                    >
                        <h2 className="mb-0">Edit Profile</h2>
                    </div>
                    <div className="card-body">
                        {success && (
                            <div className="alert alert-success" role="alert" style={{ backgroundColor: '#a5d6a7', color: '#1b5e20', borderColor: '#81c784' }}>
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role="alert" style={{ backgroundColor: '#ef9a9a', color: '#b71c1c', borderColor: '#e57373' }}>
                                {error}
                            </div>
                        )}

                        <div className="text-center mb-4">
                            <div className="position-relative d-inline-block">
                                <img
                                    src={previewUrl || '/default-avatar.png'}
                                    alt="Profile"
                                    className="rounded-circle border"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderColor: '#2e7d32',
                                        borderWidth: '4px',
                                        borderStyle: 'solid'
                                    }}
                                />
                                <label
                                    htmlFor="profileImageInput"
                                    className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-2 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <input
                                        id="profileImageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="d-none"
                                    />
                                    <i className="fas fa-camera"></i>
                                </label>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="user_name" className="form-label fw-semibold text-success">
                                            Username:
                                        </label>
                                        <input
                                            type="text"
                                            id="user_name"
                                            name="user_name"
                                            className="form-control border-success"
                                            value={userData.user_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Email" className="form-label fw-semibold text-success">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="Email"
                                            name="Email"
                                            className="form-control border-success"
                                            value={userData.Email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Mobile" className="form-label fw-semibold text-success">
                                            Mobile:
                                        </label>
                                        <input
                                            type="tel"
                                            id="Mobile"
                                            name="Mobile"
                                            className="form-control border-success"
                                            value={userData.Mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="Address" className="form-label fw-semibold text-success">
                                            Address:
                                        </label>
                                        <textarea
                                            id="Address"
                                            name="Address"
                                            className="form-control border-success"
                                            value={userData.Address}
                                            onChange={handleChange}
                                            rows="3"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="City" className="form-label fw-semibold text-success">
                                            City:
                                        </label>
                                        <input
                                            type="text"
                                            id="City"
                                            name="City"
                                            className="form-control border-success"
                                            value={userData.City}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="State" className="form-label fw-semibold text-success">
                                            State:
                                        </label>
                                        <input
                                            type="text"
                                            id="State"
                                            name="State"
                                            className="form-control border-success"
                                            value={userData.State}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="btn"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#2e7d32',
                                        color: '#fff',
                                        borderRadius: '25px',
                                        padding: '8px 30px',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 8px rgba(46,125,50,0.4)',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary ms-3"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default EditProfile;
