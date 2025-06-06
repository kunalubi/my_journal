import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Adjust path if necessary
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddPage = () => {
    const { id } = useParams(); // 'id' from URL params
    const navigate = useNavigate();

    const [pageTitle, setPageTitle] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [pageContent, setPageContent] = useState('');
    const [loadingData, setLoadingData] = useState(true); // New state to manage loading for edit mode
    const [dataError, setDataError] = useState(null); // New state for errors during data fetching for edit

    useEffect(() => {
        const fetchPageDetails = async () => {
            if (id) {
                setLoadingData(true);
                setDataError(null);
                try {
                    // Corrected URL to include /api/
                    const response = await fetch(`http://localhost/my_journal/backend/get_page_by_id.php?id=${id}`);

                    if (!response.ok) {
                        const errorText = await response.text(); // Get raw error text for debugging
                        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
                    }

                    const result = await response.json();
                    console.log("Fetched Page Data:", result); // Debugging line

                    if (result.success) {
                        const page = result.data;
                        // Use logical OR (|| '') to ensure state is never undefined, preventing React warnings
                        setPageTitle(page.page_title || '');
                        setMetaTitle(page.meta_title || '');
                        setMetaDescription(page.meta_desc || '');
                        setPageContent(page.page_content || '');
                    } else {
                        setDataError(result.message || 'Error fetching page data.');
                        // Optionally redirect if page not found
                        // navigate('/admin/pages');
                    }
                } catch (err) {
                    console.error("Error fetching page details for edit:", err);
                    setDataError("Failed to load page data. Check network or server logs.");
                } finally {
                    setLoadingData(false);
                }
            } else {
                setLoadingData(false); // Not in edit mode, no data to load
                // Clear any previous data when switching from edit to add mode
                setPageTitle('');
                setMetaTitle('');
                setMetaDescription('');
                setPageContent('');
            }
        };

        fetchPageDetails();
    }, [id, navigate]); // Add navigate to dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pageTitle', pageTitle);
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        formData.append('pageContent', pageContent);

        let apiUrl = '';
        let successMessage = '';
        let errorMessage = '';

        if (id) {
            // This is the update operation
            formData.append('pageId', id); // Crucial: send the ID for update
            apiUrl = 'http://localhost/my_journal/backend/update_page.php'; // Corrected URL with /api/
            successMessage = 'Page updated successfully!';
            errorMessage = 'Error updating page: ';
        } else {
            // This is the add new page operation
            apiUrl = 'http://localhost/my_journal/backend/add_page.php'; // Corrected URL with /api/
            successMessage = 'Page added successfully!';
            errorMessage = 'Error adding page: ';
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData
            });

            // Check if response is OK before parsing JSON
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
            }

            const result = await response.json();
            console.log("Server Response:", result);

            if (result.success) {
                alert(successMessage);
                navigate('/admin/pages'); // Redirect to pages list
            } else {
                alert(errorMessage + (result.message || 'Unknown error.'));
            }
        } catch (error) {
            console.error('Fetch Error during submission:', error); // More descriptive error log
            alert('A network or server error occurred. Please check console for details.');
        }
    };

    if (loadingData) {
        return (
            <Sidebar title={id ? 'Edit Page' : 'Add New Page'}>
                <div className="card h-100">
                    <div className="card-body">
                        <p>Loading page data...</p>
                    </div>
                </div>
            </Sidebar>
        );
    }

    if (dataError) {
        return (
            <Sidebar title={id ? 'Edit Page' : 'Add New Page'}>
                <div className="card h-100">
                    <div className="card-body">
                        <p className="text-danger">{dataError}</p>
                        <button className="btn btn-secondary" onClick={() => navigate('/admin/pages')}>Back to Pages</button>
                    </div>
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar title={id ? 'Edit Page' : 'Add New Page'}>
  <div
    className="card"
    style={{
      backgroundColor: '#E0F7FA',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: 'none',
      margin: '0 auto',
    }}
  >
    <div className="card-body">
      <h4 className="fw-bold text-dark mb-4">
        {id ? 'Edit Page' : 'Create New Page'}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label fw-semibold">Page Title <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            required
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#B3E5FC',
              borderRadius: '8px',
            }}
            placeholder="Enter page title"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Meta Title</label>
          <input
            type="text"
            className="form-control"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#B3E5FC',
              borderRadius: '8px',
            }}
            placeholder="Enter meta title"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Meta Description</label>
          <input
            type="text"
            className="form-control"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#B3E5FC',
              borderRadius: '8px',
            }}
            placeholder="Enter meta description"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Page Content</label>
          <div
            style={{
              border: '1px solid #B3E5FC',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              padding: '10px',
              minHeight: '250px',
            }}
          >
            <CKEditor
              editor={ClassicEditor}
              data={pageContent}
              onChange={(event, editor) => {
                setPageContent(editor.getData());
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/admin/pages')}
            style={{ borderRadius: '8px', padding: '8px 20px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#0288D1',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 20px',
            }}
          >
            {id ? 'Update Page' : 'Save Page'}
          </button>
        </div>
      </form>
    </div>
  </div>
</Sidebar>


      
    );
};

export default AddPage;