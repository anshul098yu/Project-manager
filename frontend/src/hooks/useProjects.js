import { useCallback } from 'react';
import { useProject } from '../context/ProjectContext';
import * as api from '../services/api';

export const useProjects = () => {
    const { state, dispatch } = useProject();

    const fetchProjects = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.getProjects();
            dispatch({ type: 'SET_PROJECTS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    }, [dispatch]);

    const fetchProject = useCallback(async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.getProject(id);
            dispatch({ type: 'SET_CURRENT_PROJECT', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    }, [dispatch]);

    const createProject = useCallback(async (projectData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.createProject(projectData);
            dispatch({ type: 'ADD_PROJECT', payload: response.data });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    const updateProject = useCallback(async (id, projectData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.updateProject(id, projectData);
            dispatch({ type: 'UPDATE_PROJECT', payload: response.data });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    const deleteProject = useCallback(async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await api.deleteProject(id);
            dispatch({ type: 'DELETE_PROJECT', payload: id });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    }, [dispatch]);

    return {
        ...state,
        fetchProjects,
        fetchProject,
        createProject,
        updateProject,
        deleteProject,
    };
};