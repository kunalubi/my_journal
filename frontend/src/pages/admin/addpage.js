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
            <div className="card h-100">
                <div className="card-body">
                    <h2>{id ? 'Edit Page' : 'Create New Page'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="pageTitle" className="form-label">Page Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pageTitle"
                                value={pageTitle}
                                onChange={(e) => setPageTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="metaTitle" className="form-label">Meta Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="metaTitle"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="metaDescription" className="form-label">Meta Tag Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="metaDescription"
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pageContent" className="form-label">Page Content</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={pageContent}
                                onChange={(event, editor) => {
                                    setPageContent(editor.getData());
                                }}
                            />
                        </div>

                        <button type="submit" className="btn btn-success">
                            {id ? 'Update Page' : 'Save Page'}
                        </button>
                    </form>
                </div>
            </div>
        </Sidebar>
    );
};

export default AddPage;