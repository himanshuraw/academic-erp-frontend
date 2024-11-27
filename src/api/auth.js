import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api/auth'; // Base URL for auth-related API calls

/**
 * Sends a signup request to the backend.
 * @param {Object} data - The signup data (username, password).
 * @returns {Promise} - A promise resolving the server response.
 */
export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Signup failed');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error(error.message);
        }
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const token = response.data;
        if (token) {
            localStorage.setItem('jwt', token);
        }

        return response;
    } catch (error) {
        throw error;
    }
}
