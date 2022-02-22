//Importation du service d'authentification 
import AuthService from "../services/auth.service";

//Mise en place des status
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

//Configuration du module d'authentification du store 
export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        // Gestion du login
        login({ commit }, user) {
            return AuthService.login(user).then(
                (user) => {
                    commit("loginSuccess", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },
        // Gestion du logout
        logout({ commit }) {
            AuthService.logout();
            commit("logout");
        },
        //gestion de l'enregistrement 
        register({ commit }, user) {
            return AuthService.register(user).then(
                (response) => {
                    commit("registerSuccess");
                    return Promise.resolve(response.data);
                },
                (error) => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },
    },
    //gestions des mutations pour pouvoir utiliser les variables du store tout au long de l'utilisation de l'application 
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
            state.status.register = true;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
    },
};