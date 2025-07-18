import { APIROUTES } from 'appconfig/appconstants';
import { ApiRequestClient } from './abstract.service';

/**
 * AuthService
 */
class AuthService {
    /**
     * Register 
     * @param {null} null param
     * @returns {*} function
     */
    createAccount = async (payload: { email: string; password: string }) => ApiRequestClient.post(APIROUTES.CREATE_ACCOUNT, payload);

   

    /**
     * Sign IN
     * @param {null} null param
     * @returns {*} function
     */
    signIn = async (payload: { email: string; password: string }) =>
        ApiRequestClient.post(`${APIROUTES.LOGIN}`, payload);

    /**
     * Sign IN
     * @param {null} null param
     * @returns {*} function
     */
    getCurrentUser = async () =>
        ApiRequestClient.get(`${APIROUTES.CURRENT_USER}`);
}

export const AuthServiceApi = new AuthService();
