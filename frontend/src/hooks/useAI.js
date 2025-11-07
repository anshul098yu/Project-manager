import { useCallback } from 'react';
import { useProject } from '../context/ProjectContext';
import * as api from '../services/api';

export const useAI = () => {
    const { dispatch } = useProject();

    const summarizeProject = useCallback(async (projectId) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.summarizeProject(projectId);
            dispatch({ type: 'SET_LOADING', payload: false });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'SET_ERROR', payload: error.message });
            // Return a fallback response instead of throwing error
            return {
                summary: 'Unable to generate a summary at this time.',
                recommendations: [
                    'Please try again in a few minutes.',
                    'Ensure the AI service is properly configured.',
                    'Contact support if the issue persists.'
                ]
            };
        }
    }, [dispatch]);

    const askQuestion = useCallback(async (taskId, question) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.askQuestion(taskId, question);
            dispatch({ type: 'SET_LOADING', payload: false });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'SET_ERROR', payload: error.message });
            // Return a fallback response instead of throwing error
            return {
                answer: 'Unable to generate an answer at this time. Please try again later.',
                confidence: 0.0
            };
        }
    }, [dispatch]);

    return {
        summarizeProject,
        askQuestion,
    };
};