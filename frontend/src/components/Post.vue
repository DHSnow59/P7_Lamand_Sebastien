<template>
  <form class="newPostForm">
      <div class="containerNewPost"> 
    <div class="newPostForm__title">
        <label for="title"><strong>Titre:</strong></label>
        <input v-model="this.title" class="newPostForm__title__input" maxlength="20" type="text">
    </div>
    <div class="newPostForm__content">
        <label for="content"><strong>Contenu: </strong></label>
        <textarea v-model="this.content" class="newPostForm__content__input"></textarea>
    </div>
    <div class="newPostForm__file">
    <input type="file" ref="file" @change="onFileSelected" required/>
    </div>
    <button class="newPostForm__button" @click.prevent="createPost">Publier</button>
    </div>
</form>
</template>

<script>
//Importation du service article
import ArticlesService from "../services/post"

export default {
    name: 'Post',
    data(){
        //Mise en place des Data a utiliser sur la page
        return{
            file: "",
            message: "",
            title: "",
            content: "",
        }
    },
    computed: {
        //Récuparation de l'utilisateur connecter
        currentUser() {
            return this.$store.state.auth.user.user;
        },
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/login");
        }
    },
    methods: {
        //appel du service createPost
        createPost(){
            //Création d'un form Data pour la gestion des infos et de l'image du post crée
            const formData = new FormData();
            formData.append('file', this.file, this.file.name);
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('userId', this.$store.state.auth.user.user.id);
            formData.append('creator', this.$store.state.auth.user.user.username);
            ArticlesService.createPost(formData)
            .then(() =>{
                this.message = "uploaded";    
                this.$router.push("/home"); 
            })
            .catch((err) =>{
                console.log(err);
            })
        },     
        //Gestion du fichier image ajouté par l'utilisateur  
        onFileSelected() {
            const file = this.$refs.file.files[0];
            this.file = file;
        }
    }
}
</script>

<style lang="scss" scoped>
.newPostForm{
    color: black;
    padding-top: 2rem;
    gap: 1rem;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__title{
        display: flex;
        gap: 2.7rem;
        align-items: center;
        &__input{
            border: 1px solid rgb(218, 216, 216);
            border-radius: 5px;
            width: 160px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px;
        }
    }
    &__content{
        display: flex;
        gap: 1rem;
        align-items: center;
        &__input{
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px;
            border: 1px solid rgb(218, 216, 216);
            border-radius: 15px;
            width: 260px;
            height: 15rem;
            border-radius: 5px;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }
    }
    &__button{
        font-family: 'Roboto', sans-serif;
        background-color: blue;  
        opacity: 0.85;
        border-radius: 10px;
        font-weight: bold;
        color: white;
        border: 1px solid grey;
        padding: 10px 25px 10px 25px;
        margin-top: 3rem;
    }
}
.containerNewPost{
    background-color: rgb(190, 187, 181, 0.45);
    border: 3px solid grey;
    border-radius: 20px;
    padding: 5rem;
    display: flex;
    align-items: center;
    flex-direction: column;

}
</style>