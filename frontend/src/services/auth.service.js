//Importation axios pour les requetes
import axios from "axios";
//Création de l'URL principal
const API_URL = "http://localhost:3000/api/users/";
//Création des différent services d'authentification 
class AuthService {
    login(user) {
        return axios
            .post(API_URL + "login", {
                username: user.username,
                password: user.password,
            })
            .then((response) => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(user) {
        return axios.post(API_URL + "signup", {
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }
}

export default new AuthService();