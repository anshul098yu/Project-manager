import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import EditProjectModal from '../components/EditProjectModal';
import './ProjectListPage.css';

const ProjectListPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject } = useProjects();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleCreateProject = async (projectData) => {
        try {
            await createProject(projectData);
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project. Please try again.');
        }
    };

    const handleUpdateProject = async (projectId, projectData) => {
        try {
            await updateProject(projectId, projectData);
            setIsEditModalOpen(false);
            setCurrentProject(null);
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project. Please try again.');
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project. Please try again.');
        }
    };

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    const handleEditProject = (project) => {
        setCurrentProject(project);
        setIsEditModalOpen(true);
    };

    return (
        <div className="project-list-page">
            <div className="project-list-header">
                <h2>Projects</h2>
                <button className="create-project-button" onClick={() => setIsCreateModalOpen(true)}>
                    Create Project
                </button>
            </div>

            {loading && <p>Loading projects...</p>}
            {error && <p className="error">Error: {error}</p>}

            <div className="project-list">
                {projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={() => handleProjectClick(project._id)}
                        onDelete={handleDeleteProject}
                        onEdit={handleEditProject}
                    />
                ))}
            </div>

            {isCreateModalOpen && (
                <CreateProjectModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateProject}
                />
            )}

            {isEditModalOpen && currentProject && (
                <EditProjectModal
                    project={currentProject}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setCurrentProject(null);
                    }}
                    onUpdate={handleUpdateProject}
                />
            )}
        </div>
    );
};

export default ProjectListPage;