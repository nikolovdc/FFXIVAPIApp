// public/services/userServices.js
import api from './config/apiConfig.js';
import { isGuestService } from './guestServices.js';

/**
 * checkUser
 * @returns {Error|string}
 */
async function checkUser() {
    try {
        const response = await api.get('/user/name');
        if (response.data) {
          return response.data;
        }
    } catch (error) {
      if (isGuestService(error)) {
        console.log("No user is found");
        return null;
      }
      throw new Error(`User name fetching occured! ${error}`, { cause: error });
    }
};

export { checkUser };