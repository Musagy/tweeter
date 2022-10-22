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
    <form action="">
      <div class="input">
        <span class="material-symbols-outlined"> person </span>
        <input
          v-model="loginData.usernameOrEmail"
          placeholder="Username o email"
        />
      </div>
      <div class="input">
        <span class="material-symbols-outlined"> lock </span>
        <input
          v-model="loginData.password"
          placeholder="Contraseña"
          type="password"
        />
      </div>
      <button type="button" @click="handlerSubmit">Ingresar</button>
    </form>
    <p class="register">
      No tienes cuenta. <a href="" target="">Regístrate</a>
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
import { ref } from "vue"
import type { Ref } from "vue"
import { LoginData, LoginResponse } from "../types/LoginForm"
import axios from "axios"
import { useToast } from "vue-toastification"
import { useAuthStore } from "../store/useAuthStore"

const toast = useToast()
const { login } = useAuthStore()
const loginData: Ref<LoginData> = ref({
  usernameOrEmail: "",
  password: "",
})
const errHandler: Ref<string> = ref("")

const handlerSubmit = async () => {
  errHandler.value = ""
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }
  const reqBody = JSON.stringify(loginData.value)
  axios
    .post<LoginResponse>("http://localhost:4001/auth/signin", reqBody, options)
    .then(({ data }) => {
      localStorage.setItem("token", data.token)
      if (data.user !== null) {
        console.log(login)
        login(data)
        localStorage.setItem("user", JSON.stringify(data.user))
        toast("Logeado")
      }
    })
    .catch((err: {response: any}) => {
      console.log(err)
      // if (response.data) {
      //   errHandler.value = response.data
      //   toast.error(errHandler.value)
      // }
    })
}
</script>

<style scoped>
@import url(LoginForm.css);
</style>
