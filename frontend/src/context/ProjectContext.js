import React, { createContext, useContext, useReducer } from 'react';

const ProjectContext = createContext();

const initialState = {
    projects: [],
    currentProject: null,
    tasks: [],
    loading: false,
    error: null,
};

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_PROJECTS':
            return { ...state, projects: action.payload, loading: false, error: null };
        case 'SET_CURRENT_PROJECT':
            return { ...state, currentProject: action.payload, loading: false, error: null };
        case 'SET_TASKS':
            return { ...state, tasks: action.payload, loading: false, error: null };
        case 'ADD_PROJECT':
            return { ...state, projects: [...state.projects, action.payload], loading: false, error: null };
        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map(project =>
                    project._id === action.payload._id ? action.payload : project
                ),
                currentProject: state.currentProject?._id === action.payload._id ? action.payload : state.currentProject,
                loading: false,
                error: null
            };
        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                currentProject: state.currentProject?._id === action.payload ? null : state.currentProject,
                loading: false,
                error: null
            };
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload], loading: false, error: null };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
                loading: false,
                error: null
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: false,
                error: null
            };
        case 'MOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload.taskId
                        ? { ...task, status: action.payload.newStatus }
                        : task
                ),
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

export const ProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};