// public/services/userServices.js
import api from './config/apiConfig.js';

async function checkUser() {
    try {
        const response = await api.get('/user/name');
        if (response.data) {
          return response.data.username;
        } else {
          return new Error(response.data.error.message);
        }
      } catch (error) {
        return new Error(`User name fetching occured! ${error}`, { cause: error });
      }
};

export { checkUser };