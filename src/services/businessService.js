import axios from 'axios';

const baseUrl = 'http://localhost:4000/business';

// Utility function to handle FormData creation
const createFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    return formData;
};

// Generalized function to handle Axios requests
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
        return response.data;
    } catch (error) {
        console.error(`Error in ${method} request:`, error);
        throw error;
    }
};

export const fetchBusinessById = (id) => {
    return makeAxiosRequest('get', `${baseUrl}/edit/${id}`);
};

export const updateBusiness = (id, data) => {
    const formData = createFormData(data);
    return makeAxiosRequest('post', `${baseUrl}/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const addBusiness = (data) => {
    const formData = createFormData(data);
    return makeAxiosRequest('post', `${baseUrl}/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const fetchAllBusinesses = () => {
    return makeAxiosRequest('get', baseUrl);
};

export const deleteBusiness = (id) => {
    return makeAxiosRequest('delete', `${baseUrl}/delete/${id}`);
};