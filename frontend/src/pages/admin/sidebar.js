import React, { useState } from "react";

const Sidebar = () => {
    const [isPagesOpen, setIsPagesOpen] = useState(false);
    const [isManuscriptsOpen, setIsManuscriptsOpen] = useState(false);
    const [isPublishersOpen, setIsPublishersOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

    return (
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
                    <a href="/admin-dashboard" className="text-white text-decoration-none d-block p-2" style={menuItemStyle}>
                        Dashboard
                    </a>
                </li>
                
                {/* Site Manager Section */}
                <li className="mt-3">
                    <div className="text-white text-decoration-none d-block p-2" 
                         style={menuItemStyle}
                         onClick={togglePages}>
                        <i className="fas fa-cog me-2"></i>
                        Site Manager
                        <span className="float-end">
                            {isPagesOpen ? '▼' : '▶'}
                        </span>
                    </div>
                    {isPagesOpen && (
                        <ul className="list-unstyled">
                            <li>
                                <a href="/admin/pages" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Pages
                                </a>
                            </li>
                            <li>
                                <a href="/admin/image-slider" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Image Slider
                                </a>
                            </li>
                            <li>
                                <a href="/admin/indexing-list" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Indexing List
                                </a>
                            </li>
                            <li>
                                <a href="/admin/conferences" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Conferences and Events
                                </a>
                            </li>
                            <li>
                                <a href="/admin/advertisements" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Advertisements
                                </a>
                            </li>
                            <li>
                                <a href="/admin/editorial-board" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Editorial Board
                                </a>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Manuscripts Section */}
                <li className="mt-3">
                    <div className="text-white text-decoration-none d-block p-2" 
                         style={menuItemStyle}
                         onClick={toggleManuscripts}>
                        <i className="fas fa-file-alt me-2"></i>
                        Manuscripts
                        <span className="float-end">
                            {isManuscriptsOpen ? '▼' : '▶'}
                        </span>
                    </div>
                    {isManuscriptsOpen && (
                        <ul className="list-unstyled">
                            <li>
                                <a href="/admin/manuscripts/admin-section" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Admin Section
                                </a>
                            </li>
                            <li>
                                <a href="/admin/manuscripts/reviewer" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Reviewer
                                </a>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Publishers Section */}
                <li className="mt-3">
                    <div className="text-white text-decoration-none d-block p-2" 
                         style={menuItemStyle}
                         onClick={togglePublishers}>
                        <i className="fas fa-book me-2"></i>
                        Publishers
                        <span className="float-end">
                            {isPublishersOpen ? '▼' : '▶'}
                        </span>
                    </div>
                    {isPublishersOpen && (
                        <ul className="list-unstyled">
                            <li>
                                <a href="/admin/publishers/issues" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Issues
                                </a>
                            </li>
                            <li>
                                <a href="/admin/publishers/special-issues" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Special Issues
                                </a>
                            </li>
                            <li>
                                <a href="/admin/publishers/manuscripts" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Manuscripts Published
                                </a>
                            </li>
                            <li>
                                <a href="/admin/publishers/articles" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Articles
                                </a>
                            </li>
                            <li>
                                <a href="/admin/publishers/special-articles" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Special Articles
                                </a>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Users Section */}
                <li className="mt-3">
                    <a href="/admin/dashboard" className="text-white text-decoration-none d-block p-2" style={menuItemStyle}>
                        <i className="fas fa-users me-2"></i>
                        Users
                    </a>
                </li>

                {/* Settings Section */}
                <li className="mt-3">
                    <div className="text-white text-decoration-none d-block p-2" 
                         style={menuItemStyle}
                         onClick={toggleSettings}>
                        <i className="fas fa-cogs me-2"></i>
                        Settings
                        <span className="float-end">
                            {isSettingsOpen ? '▼' : '▶'}
                        </span>
                    </div>
                    {isSettingsOpen && (
                        <ul className="list-unstyled">
                            <li>
                                <a href="/admin/settings/article-subjects" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Article Subjects
                                </a>
                            </li>
                            <li>
                                <a href="/admin/settings/article-types" className="text-white text-decoration-none d-block p-2" style={subMenuItemStyle}>
                                    Article Types
                                </a>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;