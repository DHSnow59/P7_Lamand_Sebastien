import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = 'http://localhost:3000/api/comments';

class CommentService {
    createComment(body) {
        return axios.post(API_URL + '/', body, {headers: authHeader()});
    }
    deleteComment(id) {
        return axios.delete(API_URL + '/' + id, {headers: authHeader()});
    }
    getAllComment() {
        return axios.get(API_URL + '/', {headers: authHeader()});
    }
}

export default new CommentService();