// Mise en place de html
<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__nav__home" v-if="currentUser">
        <li class="header__nav__home__li">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
      </div>
      <div class="header__nav__adminboard" v-if="currentUser && currentUser.user.role === 1">
        <li class="header__nav__adminboard__li">
          <router-link to="/AdminBoard" class="nav-link">AdminBoard</router-link>
        </li>
      </div>
      <div class="header__nav__LS" v-if="!currentUser">
        <li class="header__nav__LS__li">
          <router-link to="/register" class="nav-link">Sign Up </router-link>
        </li>
        <li class="header__nav__LS__li">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </div>

      <div class="header__nav__logOut" v-if="currentUser">
        <li class="header__nav__logOut__li">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li class="header__nav__logOut__li">
          <a class="nav-link" @click.prevent="logOut">LogOut</a>
        </li>
      </div>
    </nav>
    <img
      class="header__logo"
      alt="logoHeader"
      :src="require('./assets/image/logo.png')"
    />
  </header>

  <div class="core">
    <router-view />
  </div>
</template>

// Script de Js de la page
<script>
export default {
  name: 'App',
  computed: {
    //Vérification de la connection de l'utilisateur
    signUp() {
      return this.$store.state.status.register;
    },
    //Récupération de l'utilisateur
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
  //Si utilisateur déconnecté renvois sur la page login
    if (this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    // Gestion de la deconnection de l'utilisateur 
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/register");
    },
  },
};
</script>

// Mise en place du css page
<style lang="scss">
body {
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Merriweather:ital,wght@1,700&family=Roboto:ital,wght@1,300&display=swap');
  font-family: 'Roboto', sans-serif;
  margin: 0px;
}
#app {
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1rem 2rem 1rem;
    border-bottom: 1px solid rgb(221, 216, 216);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px;
    &__logo {
      height: 3rem;
      margin-right: 1rem;
    }
    &__nav {
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: 3rem;
      display: flex;
      flex-direction: row;
      &__home {
        list-style-type: none;
        &__li > * {
          text-decoration: none;
          color: blue;
        }
      }
      &__adminboard {
        list-style-type: none;
        &__li > * {
          margin-left: 0.5rem;
          text-decoration: none;
          color: blue;
        }
      }
      &__LS {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        gap: 0.5rem;
        &__li > * {
          text-decoration: none;
          color: blue;
        }
      }
      &__logOut {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        &__li > * {
          margin-left: 0.5rem;
          text-decoration: none;
          color: blue;
        }
      }
    }
  }
  .core {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(28, 47, 77);
  }
}
@media (max-width: 550px){
  .header {
    flex-wrap: wrap;
    &__logo {
      margin-bottom: 1rem;
    }
  }
}
</style>