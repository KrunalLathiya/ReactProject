import axios from 'axios';

const baseUrl = 'http://localhost:4000/auth';  // User-related API routes

const makeAxiosRequest = async (method, url, data = null, options = {}) => {
    try {
        const config = {
            method: method,
            url: url,
            ...options,
        };
        if (data) {
            config.data = data;
        }
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error(`Error in ${method} request:`, error);
        throw error;  // Make sure to handle these errors in your calling component
    }
};

export const registerUser = async (userData) => {
    return makeAxiosRequest('post', `${baseUrl}/register`, userData);
};

export const loginUser = async (userData) => {
    return makeAxiosRequest('post', `${baseUrl}/login`, userData);
};