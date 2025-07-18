/* eslint-disable class-methods-use-this */

import axiosInstance from "appconfig/axios";
import type { AxiosResponse } from 'axios';

/**
 * ApiClient
 */
class ApiClient {
    /**
     * ApiClient GET request helper
     * @param {*} path Server API endpoint
     * @param {*} params Server request params
     * @return {*} promise
     */
    get(path: string, params = {}, headers = {}): Promise<AxiosResponse> {
        return axiosInstance.get(path, {
            params,
            headers
        });
    }

    /**
     * ApiClient POST request helper
     * @param {*} path Server API endpoint
     * @param {*} payload Request payload sent to server
     * @return {*} promise
     */
    post(path: string, payload: unknown) {
        return  axiosInstance.post(`${path}`, payload);
    }

    /**
     * ApiClient DELETE request helper
     * @param {*} path Server API endpoint
     * @param {*} params Server request params
     * @return {*} promise
     */
    delete(path: string, params?: Record<string, unknown>) {
        return  axiosInstance.delete(path, {
            params
        });
    }

    /**
     * ApiClient PATCH request helper
     * @param {*} path Server API endpoint
     * @param {*} params Server request params
     * @return {*} promise
     */
    patch(path: string, payload: unknown) {
        return  axiosInstance.patch(path, payload);
    }

    /**
     * ApiClient PUT request helper
     * @param {*} path Server API endpoint
     * @param {*} params Server request params
     * @return {*} promise
     */
    put(path: string, payload: unknown) {
        return  axiosInstance.put(path, payload);
    }

    /**
     * ApiClient PATCH request helper
     * @param {*} path Server API endpoint
     * @param {*} params Server request params
     * @return {*} promise
     */
    uploadRequest(path: string, payload?: object) {
        return  axiosInstance.post(path, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export const ApiRequestClient = new ApiClient();
