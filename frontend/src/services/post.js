import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = 'http://localhost:3000/api/posts';

class PostService {
    createPost(body) {
        return axios.post(API_URL + '/', body, {headers: authHeader()});
    }

    deletePost(id) {
        return axios.delete(API_URL + '/' + id, {headers: authHeader()});
    }

    getAllPost() {
        return axios.get(API_URL + '/', {headers: authHeader()});
    }



}

export default new PostService();