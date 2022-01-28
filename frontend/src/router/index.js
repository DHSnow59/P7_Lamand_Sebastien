import { createRouter, createWebHashHistory } from 'vue-router'
// Importation des chemins 
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import BoardAdmin from '../components/BoardAdmin.vue'


const routes = [{
        path: '/Home',
        name: 'Home',
        component: Home,
    },

    //Création de la route Register
    {
        path: '/Register',
        name: 'Register',
        component: Register,
    },
    // Création de la route login
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    //Création de la route Profile
    {
        path: '/Profile',
        name: 'Profile',
        component: Profile,
    },
    //Creation de la route du tableau des admins 
    {
        path: '/BoardAdmin',
        name: 'BoardAdmin',
        component: BoardAdmin,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router