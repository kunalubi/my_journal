import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ children, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPagesOpen, setIsPagesOpen] = useState(false);
    const [isManuscriptsOpen, setIsManuscriptsOpen] = useState(false);
    const [isPublishersOpen, setIsPublishersOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        navigate('/admin/profile', { state: { user } });
    };


    const togglePages = () => {
        setIsPagesOpen(!isPagesOpen);
    };

    const toggleManuscripts = () => {
        setIsManuscriptsOpen(!isManuscriptsOpen);
    };

    const togglePublishers = () => {
        setIsPublishersOpen(!isPublishersOpen);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const menuItemStyle = {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '5px',
        marginBottom: '5px'
    };

    const subMenuItemStyle = {
        ...menuItemStyle,
        paddingLeft: '20px',
        fontSize: '0.9rem'
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const getActiveStyle = (path) => {
        return {
            ...menuItemStyle,
            backgroundColor: isActive(path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
        };
    };

    const getSubActiveStyle = (path) => {
        return {
            ...subMenuItemStyle,
            backgroundColor: isActive(path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
        };
    };

    return (
        <div className="d-flex flex-column vh-100">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                <div className="d-flex align-items-center">
                    <h2 className="mb-0">{title}</h2>
                </div>
                <div>
                    <button className="btn btn-warning me-2" onClick={handleProfile}>
                        <i className="fas fa-user me-1"></i> Profile
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-1"></i> Logout
                    </button>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="d-flex flex-grow-1">
                {/* Sidebar */}
                <div className="bg-dark text-white h-100" style={{ minWidth: '250px' }}>
                    <div className="text-center py-4 border-bottom border-secondary">
                        <img 
                            src="/images/logoo.jpg" 
                            alt="Logo" 
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '80px', height: '80px' }}
                        />
                        <h4 className="mb-0">Admin Panel</h4>
                    </div>
                    <ul className="list-unstyled px-3 py-3">
                        <li>
                            <div 
                                onClick={() => navigate('/admin-dashboard')} 
                                className="text-white text-decoration-none d-block p-2" 
                                style={getActiveStyle('/admin-dashboard')}
                            >
                                <i className="fas fa-tachometer-alt me-2"></i>
                                Dashboard
                            </div>
                        </li>
                        
                        {/* Site Manager Section */}
                        <li className="mt-3">
                            <div 
                                className="text-white text-decoration-none d-block p-2" 
                                style={menuItemStyle}
                                onClick={togglePages}
                            >
                                <i className="fas fa-cog me-2"></i>
                                Site Manager
                                <span className="float-end">
                                    {isPagesOpen ? '▼' : '▶'}
                                </span>
                            </div>
                            {isPagesOpen && (
                                <ul className="list-unstyled">
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/pages')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/pages')}
                                        >
                                            Pages
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/image-slider')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/image-slider')}
                                        >
                                            Image Slider
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/indexing-list')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/indexing-list')}
                                        >
                                            Indexing List
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/conferences')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/conferences')}
                                        >
                                            Conferences and Events
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/advertisements')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/advertisements')}
                                        >
                                            Advertisements
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/editorial-board')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/editorial-board')}
                                        >
                                            Editorial Board
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Manuscripts Section */}
                        <li className="mt-3">
                            <div 
                                className="text-white text-decoration-none d-block p-2" 
                                style={menuItemStyle}
                                onClick={toggleManuscripts}
                            >
                                <i className="fas fa-file-alt me-2"></i>
                                Manuscripts
                                <span className="float-end">
                                    {isManuscriptsOpen ? '▼' : '▶'}
                                </span>
                            </div>
                            {isManuscriptsOpen && (
                                <ul className="list-unstyled">
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/manuscripts/admin-section')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/manuscripts/admin-section')}
                                        >
                                            Admin Section
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/manuscripts/reviewer')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/manuscripts/reviewer')}
                                        >
                                            Reviewer
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Publishers Section */}
                        <li className="mt-3">
                            <div 
                                className="text-white text-decoration-none d-block p-2" 
                                style={menuItemStyle}
                                onClick={togglePublishers}
                            >
                                <i className="fas fa-book me-2"></i>
                                Publishers
                                <span className="float-end">
                                    {isPublishersOpen ? '▼' : '▶'}
                                </span>
                            </div>
                            {isPublishersOpen && (
                                <ul className="list-unstyled">
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/publishers/issues')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/publishers/issues')}
                                        >
                                            Issues
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/publishers/special-issues')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/publishers/special-issues')}
                                        >
                                            Special Issues
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/publishers/manuscripts')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/publishers/manuscripts')}
                                        >
                                            Manuscripts Published
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/publishers/articles')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/publishers/articles')}
                                        >
                                            Articles
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/publishers/special-articles')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/publishers/special-articles')}
                                        >
                                            Special Articles
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Users Section */}
                        <li className="mt-3">
                            <div 
                                onClick={() => navigate('/admin/users')} 
                                className="text-white text-decoration-none d-block p-2" 
                                style={getActiveStyle('/admin/users')}
                            >
                                <i className="fas fa-users me-2"></i>
                                Users
                            </div>
                        </li>

                        {/* Settings Section */}
                        <li className="mt-3">
                            <div 
                                className="text-white text-decoration-none d-block p-2" 
                                style={menuItemStyle}
                                onClick={toggleSettings}
                            >
                                <i className="fas fa-cogs me-2"></i>
                                Settings
                                <span className="float-end">
                                    {isSettingsOpen ? '▼' : '▶'}
                                </span>
                            </div>
                            {isSettingsOpen && (
                                <ul className="list-unstyled">
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/settings/article-subjects')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/settings/article-subjects')}
                                        >
                                            Article Subjects
                                        </div>
                                    </li>
                                    <li>
                                        <div 
                                            onClick={() => navigate('/admin/settings/article-types')} 
                                            className="text-white text-decoration-none d-block p-2" 
                                            style={getSubActiveStyle('/admin/settings/article-types')}
                                        >
                                            Article Types
                                        </div>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-grow-1 p-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;