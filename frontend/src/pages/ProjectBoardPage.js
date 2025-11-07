import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useAI } from '../hooks/useAI';
import KanbanBoard from '../components/KanbanBoard';
import TaskDetailModal from '../components/TaskDetailModal';
import AIAssistantPanel from '../components/AIAssistantPanel';
import ProjectSummaryModal from '../components/ProjectSummaryModal';
import './ProjectBoardPage.css';

const ProjectBoardPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [selectedTask, setSelectedTask] = useState(null);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [showProjectSummary, setShowProjectSummary] = useState(false);
    const [projectSummary, setProjectSummary] = useState(null);
    const { currentProject, loading: projectLoading, error: projectError, fetchProject } = useProjects();
    const { tasks, loading: taskLoading, error: taskError, fetchTasks } = useTasks();
    const { summarizeProject } = useAI();

    useEffect(() => {
        fetchProject(projectId);
        fetchTasks(projectId);
    }, [projectId, fetchProject, fetchTasks]);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseTaskDetail = () => {
        setSelectedTask(null);
    };

    const handleBackToProjects = () => {
        navigate('/');
    };

    const handleSummarizeProject = async () => {
        try {
            const summary = await summarizeProject(projectId);
            setProjectSummary(summary);
            setShowProjectSummary(true);
        } catch (error) {
            console.error('Error summarizing project:', error);
            // Show error in a better way
            alert('Failed to generate project summary. Please try again.');
        }
    };

    return (
        <div className="project-board-page">
            <div className="board-header">
                <button className="back-button" onClick={handleBackToProjects}>
                    ← Back to Projects
                </button>
                <h2>{currentProject?.name || 'Project Board'}</h2>
                <div className="board-actions">
                    <button className="summarize-button" onClick={handleSummarizeProject}>
                        Summarize Project
                    </button>
                    <button className="ai-assistant-button" onClick={() => setShowAIAssistant(true)}>
                        AI Assistant
                    </button>
                </div>
            </div>

            {projectLoading || taskLoading ? (
                <p>Loading board...</p>
            ) : projectError || taskError ? (
                <p className="error">Error: {projectError || taskError}</p>
            ) : (
                <KanbanBoard
                    tasks={tasks}
                    onTaskClick={handleTaskClick}
                />
            )}

            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={handleCloseTaskDetail}
                />
            )}

            {showAIAssistant && (
                <AIAssistantPanel
                    projectId={projectId}
                    onClose={() => setShowAIAssistant(false)}
                />
            )}

            {showProjectSummary && (
                <ProjectSummaryModal
                    summary={projectSummary}
                    onClose={() => setShowProjectSummary(false)}
                />
            )}
        </div>
    );
};

export default ProjectBoardPage;