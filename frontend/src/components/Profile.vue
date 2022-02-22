<template>
  <div v-if="currentUser" class="container">
    <div class="container__profil" > 
    <h3 class="container__h3"><strong>Pseudo: </strong>{{ currentUser.user.username }}</h3>
    <p class="container__id"><strong>Id: </strong>{{ currentUser.user.id }}</p>
    <p class="container__email"><strong>Email: </strong>{{ currentUser.user.email }}</p>
    <div class="container__authorities">
      <p><strong>Rang:</strong></p>
      <p v-if="currentUser.user.role === 1">Moderateur</p>
      <p v-else-if="currentUser.user.role === 0">Standard User</p>
    </div>
    <button class="container__button" @click="deleteUser(currentUser.user.id)">Delete Profile</button>
    </div>
  </div>
</template>

<script>
//Importation du service User
import UserService from "../services/user.service"

export default {
  name: "Profile",
  computed: {
    //Récuparation de l'utilisateur connecter
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods:{
    //Appel du service deleteUsersById
    deleteUser(id){
      UserService.deleteUsersById(id)
      .then(() =>{
        this.$store.dispatch("auth/logout");
        localStorage.clear();
        this.$router.push("/register"); 
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  color: white;
  &__profil {
    background-color: rgb(190, 187, 181, 0.45);
    border-radius: 15px;
    padding: 2rem;
  }
  &__h3 {
    font-weight: normal;
    color: white;
  }
  &__authorities{
    display: flex;
    gap: 0.5rem;
  }
  &__button{
    font-family: 'Roboto', sans-serif;
    background-color: blue;
    opacity: 0.85;
    border-radius: 8px;
    color: white;
    margin-top: 0.5rem;
    border: 2px solid grey;
    padding: 5px 9px 5px 9px;
  }
}

strong {
  color: black;
}
</style>