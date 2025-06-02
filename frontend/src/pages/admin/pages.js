import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';

const Pages = () => {
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [pageToDelete, setPageToDelete] = useState(null);

    const handleAddPageClick = () => {
        navigate('/admin/addpage');
    };

    const fetchPages = async () => {
        try {
            const response = await fetch('http://localhost/my_journal/backend/get_pages.php');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
            const result = await response.json();
            if (result.success) {
                setPages(result.data);
            } else {
                setError(result.message || 'Failed to fetch pages.');
            }
        } catch (err) {
            console.error("Error fetching pages:", err);
            setError("Failed to load pages. Please check your network and server connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const confirmDeletePage = (pageId) => {
        setPageToDelete(pageId);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!pageToDelete) return;

        try {
            const response = await fetch('http://localhost/my_journal/backend/delete_page.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ page_id: pageToDelete })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                await fetchPages();
                alert('Page deleted successfully');
            } else {
                throw new Error(result.message || 'Failed to delete page');
            }
        } catch (err) {
            console.error("Error deleting page:", err);
            alert(`Error deleting page: ${err.message}`);
        } finally {
            setShowModal(false);
            setPageToDelete(null);
        }
    };

    return (
        <Sidebar title="Pages">
            <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">All Pages</h5>
                    <button className="btn btn-primary" onClick={handleAddPageClick}>
                        Add New Page
                    </button>
                </div>
                <div className="card-body">
                    {loading && <p>Loading pages...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!loading && !error && pages.length === 0 && (
                        <p>No pages found. Click "Add New Page" to create one.</p>
                    )}
                    {!loading && !error && pages.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Page Title</th>
                                        <th>Meta Description</th>
                                        <th>Created Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page) => (
                                        <tr key={page.page_id}>
                                            <td>{page.page_id}</td>
                                            <td>{page.page_title}</td>
                                            <td>{page.meta_desc}</td>
                                            <td>{new Date(page.created_date).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-info me-2"
                                                    onClick={() => navigate(`/admin/addpage/${page.page_id}`)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => confirmDeletePage(page.page_id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this page? This action cannot be undone.</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </Sidebar>
    );
}

export default Pages;
