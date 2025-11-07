import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick, onDelete, onEdit }) => {
    // Format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project? This will also delete all associated tasks.')) {
            onDelete(project._id);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEdit(project);
    };

    return (
        <div className="project-card" onClick={onClick}>
            <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-actions">
                    <button
                        className="edit-project-button"
                        onClick={handleEditClick}
                        aria-label="Edit project"
                    >
                        ✏️
                    </button>
                    <button
                        className="delete-project-button"
                        onClick={handleDeleteClick}
                        aria-label="Delete project"
                    >
                        ×
                    </button>
                </div>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-footer">
                <span className="project-date">Created: {formatDate(project.createdAt)}</span>
                {project.updatedAt && (
                    <span className="project-date">Updated: {formatDate(project.updatedAt)}</span>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;