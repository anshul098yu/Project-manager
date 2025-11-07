import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './TaskCard.css';

const TaskCard = ({ task, onClick, onDelete, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task._id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto'
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

    // Get status class for styling
    const getStatusClass = (status) => {
        switch (status) {
            case 'todo':
                return 'status-todo';
            case 'inProgress':
                return 'status-in-progress';
            case 'done':
                return 'status-done';
            default:
                return '';
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(task._id);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEdit(task);
    };

    const handleActionClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`task-card ${getStatusClass(task.status)}`}
            onClick={onClick}
            {...attributes}
            {...listeners}
        >
            <div className="task-header">
                <h4 className="task-title">{task.title}</h4>
                <span className={`task-status-badge ${getStatusClass(task.status)}`}>
                    {formatStatus(task.status)}
                </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-footer">
                <span className="task-date">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <div className="task-actions">
                    <button
                        className="edit-task-button"
                        onClick={handleEditClick}
                        aria-label="Edit task"
                        onMouseDown={handleActionClick}
                        onTouchStart={handleActionClick}
                    >
                        ✏️
                    </button>
                    <button
                        className="delete-task-button"
                        onClick={handleDeleteClick}
                        aria-label="Delete task"
                        onMouseDown={handleActionClick}
                        onTouchStart={handleActionClick}
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;