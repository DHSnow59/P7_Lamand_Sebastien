//Importation axios pour les requetes
import axios from 'axios';
//Importation du service auth.header pour la récupération du TOKEN
import authHeader from "./auth.header";
//Création de l'URL de base
const API_URL = 'http://localhost:3000/api/comments';
//création des différents service pour les requetes lier au commentaires 
class CommentService {
    createComment(body) {
        return axios.post(API_URL + '/', body, { headers: authHeader() });
    }
    deleteComment(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() });
    }
    getAllComment() {
        return axios.get(API_URL + '/', { headers: authHeader() });
    }
}

export default new CommentService();