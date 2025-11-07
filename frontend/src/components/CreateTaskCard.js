import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useParams } from 'react-router-dom';
import './CreateTaskCard.css';

const CreateTaskCard = () => {
    const { projectId } = useParams();
    const [isCreating, setIsCreating] = useState(false);
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    });
    const { createTask } = useTasks();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (taskData.title.trim() && taskData.description.trim()) {
            try {
                await createTask({
                    ...taskData,
                    projectId,
                    status: 'todo'
                });
                setTaskData({ title: '', description: '' });
                setIsCreating(false);
            } catch (error) {
                console.error('Error creating task:', error);
                alert('Failed to create task. Please try again.');
            }
        }
    };

    if (!isCreating) {
        return (
            <div className="create-task-card" onClick={() => setIsCreating(true)}>
                <span className="plus-icon">+</span>
                <span>Add a task</span>
            </div>
        );
    }

    return (
        <div className="create-task-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder="Task title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        placeholder="Task description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                    />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setIsCreating(false)}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={!taskData.title.trim() || !taskData.description.trim()}>Add Task</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTaskCard;