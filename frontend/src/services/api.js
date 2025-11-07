import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Project API
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (projectData) => api.post('/projects', projectData);
export const updateProject = (id, projectData) => api.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Task API
export const getTasks = (projectId) => api.get(`/tasks/project/${projectId}`);
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const moveTask = (id, status) => api.patch(`/tasks/${id}/move`, { status });

// AI API
export const summarizeProject = (projectId) => api.get(`/ai/summarize/${projectId}`);
export const askQuestion = (taskId, question) => api.post(`/ai/question/${taskId}`, { question });

export default api;