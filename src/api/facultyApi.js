import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));



export const registerFaculty = async (formData) => {
    try {
        const response = await apiClient.post('/employee/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred while registering the faculty";
    }
};

export const getAllCourses = async () => {
    try {
        const response = await apiClient.get('/courses');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred while fetching the courses";
    }
};

export const submitCourses = async (facultyEmail, courseIds) => {
    try {
        const response = await apiClient.post(`/addCourses/${facultyEmail}`, courseIds, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred while submitting courses";
    }
};
