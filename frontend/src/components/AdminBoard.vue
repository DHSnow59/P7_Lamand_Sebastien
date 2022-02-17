<template>
  <div v-if="currentUser" class="container">
    <div class="users"> 
    <h3 class="container__h3">Users:</h3>
    <div class="container__bloc" :key="item.username" v-for="item in users">
      <div class="container__bloc__check" v-if="currentUser.user.username !== item.username">
        <p class="container__bloc__check__pseudo">{{item.username}}: </p>
        <p class="container__bloc__check__email">{{item.email}}</p>
        <button class="container__bloc__check__button" @click="deleteUser(item.id)">Supprimer</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service"

export default {
  name: "AdminBoard",
  data() {
    return {
      users: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    UserService.getAllUsers().then(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        console.log(error);
      }
    ); 
  },
  methods: {
    deleteUser(id) {
      UserService.deleteUsersById(id)
      .then(() =>{
          location.reload();
      })
      .catch((err) =>{
          console.log(err);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 2rem;
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  &__bloc{
    &__check{
      width: 18rem;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: space-between;
      &__button{
        font-family: 'Roboto', sans-serif;
        background-color: blue;
        border-radius: 5px;
        height: 1.4rem;
        font-weight: bold;
        color: white;
        border: 1px solid grey;
        align-self: center;
      }
    }
  }
}

.users {
  border: 2px solid grey;
  border-radius: 20px;
  background-color: rgb(190, 187, 181, 0.45);
  padding-left: 2rem;
  padding-right: 5rem;
}

</style>