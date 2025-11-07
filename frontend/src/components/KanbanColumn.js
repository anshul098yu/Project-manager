import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import './KanbanColumn.css';

const KanbanColumn = ({ column, tasks, onTaskClick, onDeleteTask, onEditTask }) => {
    const { attributes, listeners, setNodeRef: setSortableRef, transform, transition } = useSortable({
        id: column.id
    });

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
        id: column.id,
        data: {
            columnId: column.id
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setSortableRef} style={style} className="kanban-column" {...attributes}>
            <div className="column-header" {...listeners}>
                <h3>{column.title}</h3>
                <span className="task-count">{tasks.length}</span>
            </div>
            <div
                ref={setDroppableRef}
                className={`column-tasks ${isOver ? 'drag-over' : ''}`}
                data-column-id={column.id}
            >
                <div className="tasks-container">
                    {tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onClick={() => onTaskClick(task)}
                            onDelete={onDeleteTask}
                            onEdit={onEditTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KanbanColumn;