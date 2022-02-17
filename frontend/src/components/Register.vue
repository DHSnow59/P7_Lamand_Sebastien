<template>
  <div class="container">
    <div class="container__bloc">
      <Form
        class="container__bloc__form"
        @submit="handleRegister"
        :validation-schema="schema"
      >
        <div class="container__bloc__form__checked" v-if="!successful">
          <div class="container__bloc__form__checked__item">
            <label for="username">Pseudo</label>
            <Field class="container__bloc__form__checked__item__field" name="username" type="text" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="container__bloc__form__checked__item">
            <label for="email">Email</label>
            <Field class="container__bloc__form__checked__item__field"  name="email" type="email" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="container__bloc__form__checked__item">
            <label for="password">Password</label>
            <Field class="container__bloc__form__checked__item__field"  name="password" type="password" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="container__bloc__form__checked__button">
            <button class="container__bloc__form__checked__button__field" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/login");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25rem;
    width: 20rem;
    border: 3px solid rgb(212, 212, 212);
     border-radius: 10%;
    &__form {
      &__checked {
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
        }
        &__button{
          &__field{
            font-family: 'Roboto', sans-serif;
            background-color: blue;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            border: 1px solid grey;
            padding-top: 8px;
            padding-bottom: 8px;
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      }
    }
    .alert{
      margin-top: 1rem;
    }
  }
}
</style>