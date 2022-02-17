<template>
  <div class="container">
    <router-link to="/Post"><button class="container__newPost">New Post</button></router-link>
    <div v-if="currentUser" class="container__main">
      <div :key="item.updatedAt" v-for="item in content.slice().reverse()" class="container__main__post">
        <div class="container__main__post__creator"><p><strong>Crée par: </strong>{{ item.auteur }}</p></div>
        <img class="container__main__post__img" :src="item.image_url"/>
        <div class="container__main__post__title"><p><strong>Titre: </strong>{{ item.titre }}</p></div>
        <div class="container__main__post__content"><p>"{{ item.contenu }}"</p></div>
        <button v-if="checkComment === 0" @click="checkComments()" class="container__main__post__buttonComment">Commenter</button>
        <div @keyup.enter="createComments(item.id)" v-if="checkComment === 1" class="container__main__post__comment">
          <label for="content"></label>
          <textarea v-model="newCommentContent" maxlength="100" class="container__main__post__comment__text"></textarea>
        </div>
        <div :key="comments.comments" v-for="comments in item.comments" class="container__main__post__comments">
          <div class="container__main__post__comments__username"><p><strong>Crée par: </strong>{{ comments.auteur}}</p></div>
          <div class="container__main__post__comments__content"><p>"{{ comments.contenu }}"</p></div>
          <div class="container__main__post__comments__date">
            <p class="container__main__post__comments__date__p"><strong>&ensp;&ensp;&ensp;&ensp;Crée le: </strong>{{ comments.createdAt.split("T")[0] + " à " + comments.createdAt.split("T")[1].split(".")[0] }}</p>
            <button class="container__main__post__comments__date__button" @click="deleteComments(comments.id)" v-if="currentUser.user.username === comments.auteur">Sup</button>
          </div>        
        </div>
        <div class="container__main__post__button">
          <p class="container__main__post__button__date"><strong>&ensp;&ensp;Crée le: </strong>{{ item.createdAt.split("T")[0] + " à " + item.createdAt.split("T")[1].split(".")[0]}}</p>
          <button class="container__main__post__button__field" @click="deletePost(item.id)" v-if="currentUser.user.username === item.auteur">Sup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesService from "../services/post";
import CommentsService from "../services/comment";


export default {
  name: "Home",
  data() {
    return {
      space: "  ",
      content: [],
      checkComment: 0,
      newCommentContent: "",
    };
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user.user.username)
      return this.$store.state.auth.user
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    ArticlesService.getAllPost().then(
      (response) => {
        this.content = response.data;
        console.log(this.content)
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    deletePost(id){ 
      ArticlesService.deletePost(id)
      .then((res) =>{
        console.log(res);
        location.reload();
      })
      .catch((err) =>{
        console.log(err);
      })
    },
    deleteComments(id){
      CommentsService.deleteComment(id) 
      .then((res) =>{
        console.log(res);
        location.reload();
      })
      .catch((err) =>{
        console.log(err);
      })
    },
    checkComments(){
      this.checkComment = 1;
    },
    createComments(id){
      const comment = {auteur: this.$store.state.auth.user.user.username, contenu: this.newCommentContent, post_id: id};
      CommentsService.createComment(comment)
      .then((res) =>{
        console.log(res);
        location.reload();
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
  align-items: center;
  min-height: 89vh;
  padding-bottom: 2rem;
  &__newPost{
    margin-top: 1rem;
    font-family: 'Roboto', sans-serif;
    background-color: blue;
    border-radius: 5px;
    color: white;
    border: 1px solid grey;
  }
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__post {
      width: 90%;
      max-width: 50rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 1rem;
      border: 1px solid rgb(214, 212, 212);
      border-radius: 15px;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 20px;
      &__creator{
        width: 100%;
        position: relative;
        overflow: hidden;
        display: inline-block;
        overflow-wrap: break-word;
        text-align: start;
        padding: 1rem 0rem 1rem 0rem;
        p{
          margin: 0rem 1rem 0rem 1rem;
        }
      }
      &__img{
        width: 100%;
        height: 25rem;
        object-fit: cover;
      }
      &__title{
        padding: 1rem 0rem 1rem 0rem;
        border-bottom: 1px solid rgb(214, 212, 212);
        overflow-wrap: break-word;
        width: 100%;
        text-align: start;
        p{
           margin: 0rem 1rem 0rem 1rem;
        }
      }
      &__content{
        width: 100%;
        overflow-wrap: break-word;
        margin: 1rem 0rem 0rem 0rem;
        text-align: start;
        p{
          margin: 0rem 1rem 0rem 1rem;
        }
      }
      &__buttonComment{
        align-self: end;
        right: 0;
        margin: 0.5rem 1rem 0.5rem 0rem;
        font-family: 'Roboto', sans-serif;
        background-color: blue;
        border-radius: 5px;
        height: 1.4rem;
        color: white;
        border: 1px solid grey;
      }
      &__comment{
        width: 100%;
        overflow-wrap: break-word;
        &__text{
          margin: 1rem 0rem 1rem 0rem;
          width: 50%;
        }
      }
      &__comments{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-top: 1px solid rgb(214, 212, 212);
        &__username{
          padding: 1rem 0rem 1rem 0rem;
          text-align: start;
          width: 100%;
          overflow-wrap: break-word;
          p{
            margin: 0rem 2rem 0rem 2rem;
          }
        }
        &__content{
          width: 100%;
          overflow-wrap: break-word;
          text-align: start;
          p{
            margin: 0rem 3rem 0rem 3rem;
          }
        }
        &__date{
          width: 100%;
          display: flex;
          gap: 1rem;
          &__button{
            align-self: center;
            font-family: 'Roboto', sans-serif;
            background-color: blue;
            border-radius: 5px;
            height: 1.4rem;
            color: white;
            border: 1px solid grey;
          }
        }
      }
      &__button {
        display: flex;
        width: 100%;
        border-top: 1px solid rgb(214, 212, 212);
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0rem 0.5rem 0rem;
        &__field {
          font-family: 'Roboto', sans-serif;
          background-color: blue;
          border-radius: 5px;
          height: 1.4rem;
          color: white;
          border: 1px solid grey;
        }
      }
    }
  }
  @media (max-width: 550px){
    img{
     max-height: 12rem;
    }
  }
}
</style>
