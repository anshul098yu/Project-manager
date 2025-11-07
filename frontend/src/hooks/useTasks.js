import { useCallback } from 'react';
import { useProject } from '../context/ProjectContext';
import * as api from '../services/api';

export const useTasks = () => {
    const { state, dispatch } = useProject();

    const fetchTasks = useCallback(async (projectId) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.getTasks(projectId);
            dispatch({ type: 'SET_TASKS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    }, [dispatch]);

    const createTask = useCallback(async (taskData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.createTask(taskData);
            dispatch({ type: 'ADD_TASK', payload: response.data });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    const updateTask = useCallback(async (id, taskData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.updateTask(id, taskData);
            dispatch({ type: 'UPDATE_TASK', payload: response.data });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    const deleteTask = useCallback(async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await api.deleteTask(id);
            dispatch({ type: 'DELETE_TASK', payload: id });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    const moveTask = useCallback(async (taskId, newStatus) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.moveTask(taskId, newStatus);
            dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus } });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    return {
        ...state,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        moveTask,
    };
};