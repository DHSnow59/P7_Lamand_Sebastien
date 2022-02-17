import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Profile  from "./components/Profile.vue";
import AdminBoard from "./components/AdminBoard.vue";
import Post from "./components/Post.vue"

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Post",
    component: Post,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/AdminBoard",
    component: AdminBoard,
  },
  {
    path: "/profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/register");
  } else {
    next();
  }
});

export default router;