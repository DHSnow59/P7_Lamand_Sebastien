import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/users';

class UserService {
    getAllUser() {
        return axios.get(API_URL + '/');
    }

    deleteUserById(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() });
    }

}

export default new UserService();