import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const Users = () => {
    const [users, setUsers] = useState({
        admin: [],
        author: [],
        editor: [],
        reviewer: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost/my_journal/backend/admin.php?action=get_users');
            const data = await response.json();

            if (data.success) {
                // Group users by type (case-insensitive)
                const groupedUsers = {
                    admin: data.users.filter(user => user.user_Type?.toLowerCase() === 'admin' || user.user_type?.toLowerCase() === 'admin'),
                    author: data.users.filter(user => user.user_Type?.toLowerCase() === 'author' || user.user_type?.toLowerCase() === 'author'),
                    editor: data.users.filter(user => user.user_Type?.toLowerCase() === 'editor' || user.user_type?.toLowerCase() === 'editor'),
                    reviewer: data.users.filter(user => user.user_Type?.toLowerCase() === 'reviewer' || user.user_type?.toLowerCase() === 'reviewer')
                };
                setUsers(groupedUsers); 
            } else {
                throw new Error(data.message || 'Failed to fetch users');
            }
        } catch (error) {
            setError(error.message || 'Failed to fetch users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = (user) => {
        navigate('/admin/editprofile', { state: { user } });
    };

    const renderUserCard = (user) => (
        <div className="col-md-3 mb-4" key={user.login_id}>
            <div className="card h-100 shadow-sm">
                <div className="card-body p-3">
                    <div className="text-center mb-3">
                        <div className="position-relative d-inline-block">
                            <img 
                                src={user.user_image ? `http://localhost/my_journal/public/${user.user_image}` : '/images/default.jpeg'} 
                                alt={user.First_Name}
                                className="rounded-circle mb-2"
                                style={{ 
                                    width: '100px', 
                                    height: '100px', 
                                    objectFit: 'cover',
                                    border: '3px solid #fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            />
                            <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2">
                                <i className="fas fa-user"></i>
                            </div>
                        </div>
                        <h5 className="card-title mb-1 mt-2">{user.First_Name}</h5>
                        <small className="text-muted d-block mb-2">{user.Email}</small>
                    </div>
                    <div className="card-text">
                        <div className="d-flex gap-5 mb-2">
                            <small className="text-muted">Mobile:</small>
                            <small className="fw-medium">{user.Mobile}</small>
                        </div>
                        <div className="d-flex gap-5 mb-2">
                            <small className="text-muted">City:</small>
                            <small className="fw-medium">{user.City}</small>
                        </div>
                        <div className="d-flex gap-5 mb-2">
                            <small className="text-muted">State:</small>
                            <small className="fw-medium">{user.State}</small>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button 
                            className="btn btn-primary btn-sm px-4"
                            onClick={() => handleEditProfile(user)}
                        >
                            <i className="fas fa-edit me-1"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <Sidebar title="Users Profile">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading users...</p>
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
                    <button className="btn btn-primary" onClick={fetchUsers}>
                        Try Again
                    </button>
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar title="Users Profile">
            <div className="card h-100">
                <div className="card-body">
                    {/* Navigation Pills */}
                    <ul className="nav nav-pills justify-content-center gap-5 mb-4" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button 
                                className="nav-link active" 
                                id="pills-Admin-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#pills-Admin" 
                                type="button" 
                                role="tab" 
                                aria-controls="pills-Admin" 
                                aria-selected="true"
                            >
                                Admin ({users.admin.length})
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className="nav-link" 
                                id="pills-Author-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#pills-Author" 
                                type="button" 
                                role="tab" 
                                aria-controls="pills-Author" 
                                aria-selected="false"
                            >
                                Author ({users.author.length})
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className="nav-link" 
                                id="pills-Editor-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#pills-Editor" 
                                type="button" 
                                role="tab" 
                                aria-controls="pills-Editor" 
                                aria-selected="false"
                            >
                                Editor ({users.editor.length})
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className="nav-link" 
                                id="pills-Reviewer-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#pills-Reviewer" 
                                type="button" 
                                role="tab" 
                                aria-controls="pills-Reviewer" 
                                aria-selected="false"
                            >
                                Reviewer ({users.reviewer.length})
                            </button>
                        </li>
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-content" id="pills-tabContent">
                        {/* Admin Tab */}
                        <div className="tab-pane fade show active" id="pills-Admin" role="tabpanel" aria-labelledby="pills-Admin-tab">
                            <div className="row">
                                {users.admin.length > 0 ? (
                                    users.admin.map(renderUserCard)
                                ) : (
                                    <div className="col-12 text-center">
                                        <p>No admin users found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Author Tab */}
                        <div className="tab-pane fade" id="pills-Author" role="tabpanel" aria-labelledby="pills-Author-tab">
                            <div className="row">
                                {users.author.length > 0 ? (
                                    users.author.map(renderUserCard)
                                ) : (
                                    <div className="col-12 text-center">
                                        <p>No author users found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Editor Tab */}
                        <div className="tab-pane fade" id="pills-Editor" role="tabpanel" aria-labelledby="pills-Editor-tab">
                            <div className="row">
                                {users.editor.length > 0 ? (
                                    users.editor.map(renderUserCard)
                                ) : (
                                    <div className="col-12 text-center">
                                        <p>No editor users found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reviewer Tab */}
                        <div className="tab-pane fade" id="pills-Reviewer" role="tabpanel" aria-labelledby="pills-Reviewer-tab">
                            <div className="row">
                                {users.reviewer.length > 0 ? (
                                    users.reviewer.map(renderUserCard)
                                ) : (
                                    <div className="col-12 text-center">
                                        <p>No reviewer users found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default Users;
