import { AuthContext } from '@auth';
import axios from 'axios';
import {
    requestHandler,
    successHandler,
    errorHandler,
} from './base.api.interceptor';

const api = axios.create({
    withCredentials: true,
    // baseURL: window.API_URL,
    // baseURL: process.env.API_URL,
    baseURL: 'https://localhost:5001',
});

// NS need to validate only for IE browser
api.defaults.headers.Pragma = 'no-cache';

api.interceptors.request.use((request) => requestHandler(request));

api.interceptors.request.use((config) => {
    //config.headers[''] = '';
    config.headers['Authorization'] = `Bearer ${AuthContext.User.accessToken}`;
    return config;
});

api.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error),
);

export { api as Api };
