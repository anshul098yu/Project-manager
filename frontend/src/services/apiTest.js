import axios from 'axios';

// Test function to check API connectivity
export const testApiConnection = async () => {
    try {
        // Log the API base URL being used
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        console.log('Testing API connection to:', API_BASE_URL);

        // Test the base endpoint
        const response = await axios.get(`${API_BASE_URL}/`);
        console.log('API Test Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Test Error:', error.response || error.message);
        throw error;
    }
};

// Test function to check projects endpoint
export const testProjectsApi = async () => {
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        console.log('Testing Projects API at:', `${API_BASE_URL}/projects`);

        const response = await axios.get(`${API_BASE_URL}/projects`);
        console.log('Projects API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Projects API Error:', error.response || error.message);
        throw error;
    }
};