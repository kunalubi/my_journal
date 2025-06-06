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
  <div
    className="card"
    style={{
      backgroundColor: '#E0F7FA',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      border: 'none',
    }}
  >
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h4 className="text-dark fw-bold mb-0">All Pages</h4>
      <button
        className="btn"
        style={{ backgroundColor: '#0288D1', color: 'white', borderRadius: '8px' }}
        onClick={handleAddPageClick}
      >
        Add New Page
      </button>
    </div>

    {loading && (
      <div className="text-center">
        <div className="spinner-border text-info" role="status" />
        <p className="mt-3 text-dark">Loading pages...</p>
      </div>
    )}
    {error && <p className="text-danger">{error}</p>}
    {!loading && !error && pages.length === 0 && (
      <p>No pages found. Click "Add New Page" to create one.</p>
    )}
    {!loading && !error && pages.length > 0 && (
      <div className="table-responsive">
        <table className="table table-bordered table-hover" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Meta Description</th>
              <th>Created</th>
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
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/admin/addpage/${page.page_id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
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
              <p>Are you sure you want to delete this page?</p>
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
