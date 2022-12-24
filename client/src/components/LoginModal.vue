<template>
  <div class="loginCtn">
    <img src="/tweeter.svg" alt="logo" />
    <h1>
      Proyecto de clon de twitter. Desafío de
      <b>devchallenge.io</b>
    </h1>
    <p>
      Esta app esta hecho con <b>vite + vue</b> en el <b>cliente</b> y
      <b>express + prisma + aws S3</b> en el <b>servidor</b>.
    </p>
    <Form type-form="signin" :inputs="signIn" />
    <p class="register">
      No tienes cuenta. <router-link to="/register"> Regístrate </router-link>
    </p>
    <footer>
      <p>
        created by
        <a href="https://github.com/Musagy" target="_blank">Musagy</a>
      </p>
      <p><a href="http://www.musagy.me" target="_blank">musagy.me</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import Form from "./Form.vue"
  import { signIn } from "../utils/signForms"
</script>

<style scoped>
  @import url(./LoginForm.css);
</style>
