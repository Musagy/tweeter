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
      <button type="submit" @click="loginHandler">Ingresar</button>
    </form>
    <p class="register">
      No tienes cuenta. <a href="" target="_blank">Regístrate</a>
    </p>
    <footer>
      <p>
        created by
        <a href="https://github.com/Musagy" target="_blank">Musagy</a>
      </p>
      <p v-if="!!errHandler">{{ errHandler }}</p>
      <p v-if="!!userHandler.token" style="color: #2d9cdb">logeado</p>
      <p><a href="http://www.musagy.me" target="_blank">musagy.me</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import type { Ref } from "vue"

interface LoginData {
  usernameOrEmail: string
  password: string
}

interface LoginResponse {
  token: string
  user: object
}

const loginData: Ref<LoginData> = ref({
  usernameOrEmail: "",
  password: "",
})
const errHandler: Ref<string> = ref("")
const userVoid: LoginResponse = { token: "", user: {} }
const userHandler: Ref<LoginResponse> = ref(userVoid)

watch(loginData.value, () => {
  console.log(loginData)
})
async function request<TResponse>(
  url: string,
  config: RequestInit
): Promise<TResponse | string> {
  const response = await fetch(url, config)
  if (response.status == 200) return await response.json()
  return await response.text()
}
const loginHandler = async (e: MouseEvent) => {
  e.preventDefault()
  errHandler.value = ""
  userHandler.value = userVoid
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData.value),
  }
  const data = await request<LoginResponse>(
    "http://localhost:4001/auth/signin",
    options
  )
  if (typeof data === "string") {
    errHandler.value = data
  } else {
    console.log(data)
    userHandler.value = data
  }
}
</script>

<style scoped>
.loginCtn {
  /* height: calc(635px - 45px - 40px); */
  width: calc(475px - 58px - 58px);
  border-radius: 24px;
  border: 1px solid #bdbdbd;
  padding: 45px 58px 40px;
  position: relative;
}
h1 {
  font-family: Noto Sans;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.035em;
  text-align: left;
  margin-top: 27px;
}
p {
  margin-top: 15px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 34px 0;
}
.input {
  color: #828282;
  display: flex;
  align-items: center;
  padding: 14px 0;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  width: 100%;
}
.input :first-child {
  margin-left: 14px;
}
.input :last-child {
  margin-right: 14px;
}
span {
  width: 20px;
  height: 20px;
  padding-bottom: 2px;
  margin-right: 12px;
}
input {
  border: none;
}
input:focus {
  outline: none;
  width: 1000%;
}
button {
  width: 100%;
  color: white;
  border: none;
  padding: 9.5px 0;
  background: #2f80ed;
  border-radius: 8px;
}
.register {
  text-align: center;
}
a {
  color: #2d9cdb;
  text-decoration: none;
}
footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  margin-left: -58px;
  margin-top: 40px;

  font-family: Noto Sans;
  font-size: 14px;
  font-weight: 400;
  color: #828282;
}
footer p:first-child a {
  font-weight: 600;
  color: #828282;
  text-decoration: underline 1px #828282;
}
footer p:last-child a {
  font-weight: 400;
  color: #828282;
}
</style>
