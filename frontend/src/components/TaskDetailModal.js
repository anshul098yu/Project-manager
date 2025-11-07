import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAI } from '../hooks/useAI';
import './TaskDetailModal.css';

const TaskDetailModal = ({ task, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
        status: task.status
    });
    const [question, setQuestion] = useState('');
    const [aiAnswer, setAiAnswer] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const { updateTask, deleteTask } = useTasks();
    const { askQuestion } = useAI();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await updateTask(task._id, editedTask);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
            try {
                await deleteTask(task._id);
                onClose();
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    const handleAskAI = async () => {
        if (question.trim()) {
            setIsAiLoading(true);
            try {
                const response = await askQuestion(task._id, question);
                setAiAnswer(response.answer);
            } catch (error) {
                console.error('Error asking AI:', error);
                setAiAnswer('Sorry, I encountered an error while processing your question. Please try again.');
            } finally {
                setIsAiLoading(false);
            }
        }
    };

    // Format the status for display
    const formatStatus = (status) => {
        switch (status) {
            case 'todo':
                return 'To Do';
            case 'inProgress':
                return 'In Progress';
            case 'done':
                return 'Done';
            default:
                return status;
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content task-detail-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Task Details</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {isEditing ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={editedTask.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={editedTask.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                rows="4"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={editedTask.status}
                                onChange={handleChange}
                            >
                                <option value="todo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                ) : (
                    <div className="task-details">
                        <div className="task-info">
                            <h3>{task.title}</h3>
                            <div className="task-meta">
                                <span className={`status-badge status-${task.status}`}>
                                    {formatStatus(task.status)}
                                </span>
                                <span className="task-date">
                                    Created: {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                                {task.updatedAt && (
                                    <span className="task-date">
                                        Updated: {new Date(task.updatedAt).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <p className="task-description">{task.description}</p>
                        </div>

                        <div className="task-actions">
                            <button className="btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
                            <button className="btn-danger" onClick={handleDelete}>Delete</button>
                        </div>

                        <div className="ai-section">
                            <h4>Ask AI about this task</h4>
                            <div className="ai-question">
                                <input
                                    type="text"
                                    placeholder="Ask a question about this task..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                                />
                                <button
                                    className="btn-primary"
                                    onClick={handleAskAI}
                                    disabled={isAiLoading || !question.trim()}
                                >
                                    {isAiLoading ? 'Thinking...' : 'Ask'}
                                </button>
                            </div>
                            {aiAnswer && (
                                <div className="ai-answer">
                                    <h5>AI Response:</h5>
                                    <p>{aiAnswer}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetailModal;