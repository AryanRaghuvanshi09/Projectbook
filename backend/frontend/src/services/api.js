import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://projectbook.onrender.com/api'  // Live URL for production
    : 'http://localhost:5000/api';  // Local URL for development

const API = axios.create({ baseURL });

// Interceptor to attach the token to requests if logged in
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
