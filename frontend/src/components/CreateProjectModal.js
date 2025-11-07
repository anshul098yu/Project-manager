import React, { useState } from 'react';
import './CreateProjectModal.css';

const CreateProjectModal = ({ onClose, onCreate }) => {
    const [projectData, setProjectData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (projectData.name.trim() && projectData.description.trim()) {
            onCreate(projectData);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Create New Project</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Project Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={projectData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter project name"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            required
                            placeholder="Enter project description"
                            rows="4"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={!projectData.name.trim() || !projectData.description.trim()}
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;