<template>
  <div class="container">
    <div class="container__bloc">
      <Form
        class="container__bloc__form"
        @submit="handleLogin"
        :validation-schema="schema"
      >
        <div class="container__bloc__form__item">
          <label for="username">Pseudo</label>
          <Field class="container__bloc__form__item__field" name="username" type="text"/>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="container__bloc__form__item">
          <label for="password">Password</label>
          <Field class="container__bloc__form__item__field" name="password" type="password"/>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="container__bloc__form__item">
          <button class="container__bloc__form__item__button" :disabled="loading">
            <span v-show="loading"></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 91vh;
  &__bloc {
    background-color: rgb(190, 187, 181, 0.45);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25rem;
    width: 20rem;
    border: 3px solid rgb(190, 187, 181);
    border-radius: 10%;
    &__form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      color: black;
      font-weight: bold;
      &__item {
        display: flex;
        flex-direction: column;
        &__field{
          border-radius: 5px;
          border: 1px solid grey;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        &__button{
          font-family: 'Roboto', sans-serif;
          background-color: blue;
          border-radius: 5px;
          color: white;
          font-weight: bold;
          width: 3.1rem;
          align-self: center;
          border: 1px solid grey;
          padding-top: 8px;
          padding-bottom: 8px;
        }
      }
    }
  }
}
</style>