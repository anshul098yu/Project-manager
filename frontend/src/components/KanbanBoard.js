import React from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import CreateTaskCard from './CreateTaskCard';
import { useTasks } from '../hooks/useTasks';
import './KanbanBoard.css';

const KanbanBoard = ({ tasks, onTaskClick }) => {
    const columns = [
        { id: 'todo', title: 'To Do' },
        { id: 'inProgress', title: 'In Progress' },
        { id: 'done', title: 'Done' }
    ];
    const { moveTask, deleteTask } = useTasks();

    // Set up sensors for better drag detection
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    // Group tasks by status
    const groupedTasks = columns.reduce((acc, column) => {
        acc[column.id] = tasks.filter(task => task.status === column.id);
        return acc;
    }, {});

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) {
            console.log('No drop target found');
            return;
        }

        const taskId = active.id;
        let newStatus = over.id;

        // Debug logging
        console.log('Drag end - active:', active);
        console.log('Drag end - over:', over);
        console.log('Task ID:', taskId);
        console.log('New status (before fix):', newStatus);

        // If newStatus is not a valid status, try to get it from the data attribute
        if (!['todo', 'inProgress', 'done'].includes(newStatus)) {
            // Check if over.data contains the column ID
            if (over.data && over.data.current && over.data.current.columnId) {
                newStatus = over.data.current.columnId;
                console.log('Got column ID from over.data:', newStatus);
            }
            // Check if over.id corresponds to a column
            else if (['todo', 'inProgress', 'done'].includes(over.id)) {
                newStatus = over.id;
                console.log('Got column ID from over.id:', newStatus);
            }
            // Try to find the column ID from the DOM
            else {
                const columnElement = document.querySelector(`[data-column-id="${over.id}"]`);
                if (columnElement) {
                    newStatus = columnElement.getAttribute('data-column-id');
                    console.log('Got column ID from DOM element:', newStatus);
                }
            }
        }

        console.log('New status (after fix):', newStatus);

        // Only move if dropped on a different column
        // Make sure the newStatus is a valid status value
        if (['todo', 'inProgress', 'done'].includes(newStatus)) {
            const task = tasks.find(t => t._id === taskId);
            if (task && task.status !== newStatus) {
                console.log('Moving task:', taskId, 'to status:', newStatus);
                try {
                    await moveTask(taskId, newStatus);
                    console.log('Task moved successfully');
                } catch (error) {
                    console.error('Error moving task:', error);
                    alert('Failed to move task. Please try again.');
                }
            } else {
                console.log('Task not moved - same status or task not found');
            }
        } else {
            console.warn('Invalid status for move operation:', newStatus);
            alert('Invalid drop target. Please drop the task on a valid column.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
        }
    };

    const handleEditTask = (task) => {
        // This will be handled by the parent component
        onTaskClick(task);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
        >
            <div className="kanban-board">
                <div className="kanban-columns">
                    {columns.map(column => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={groupedTasks[column.id]}
                            onTaskClick={onTaskClick}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                        />
                    ))}
                </div>
                <SortableContext items={columns.map(c => c.id)} strategy={rectSortingStrategy}>
                </SortableContext>
                <div className="kanban-sidebar">
                    <CreateTaskCard />
                </div>
            </div>
            <DragOverlay>
                {/* We can customize the drag overlay here if needed */}
            </DragOverlay>
        </DndContext>
    );
};

export default KanbanBoard;