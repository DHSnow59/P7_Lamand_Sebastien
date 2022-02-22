//Importation axios pour les requetes
import axios from 'axios';
//Importation du service auth.header pour la récupération du TOKEN
import authHeader from "./auth.header";

//Création de l'URL de base
const API_URL = 'http://localhost:3000/api/users';
//création des différents service pour les requetes lier au Utilisateurs
class UserService {
    getAllUsers() {
        return axios.get(API_URL + '/', { headers: authHeader() });
    }
    deleteUsersById(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() });
    }
}

export default new UserService();