/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import Cookies from 'js-cookie';
import type { AxiosResponse, AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:7000/api/`
});

axiosInstance.interceptors.request.use(
    async (config: import('axios').InternalAxiosRequestConfig) => {
        const access_token = Cookies.get('access_token');
        if (typeof access_token !== 'undefined') {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${access_token}`;
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error: unknown) => Promise.reject(error)
);

/**
 *
 * @param {*} response API
 * @returns {object} response
 */


const successHandler = (response: AxiosResponse) => response;

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => successHandler(response),
    async (error: any) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
                Cookies.remove('access_token');
                window.location.href = '/auth/sign-in';
            
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
