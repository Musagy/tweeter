<script setup lang="ts">
import Login from "./pages/LoginPage.vue"
import Layout from "./components/Layout.vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "./store/useAuthStore"

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { logout } = authStore
console.log(user)
</script>

<template>
  <div v-if="!user">
    no hay usuario
  </div>
  <div v-else>hay usuario</div>
  <Login v-if="!user" />
  <Layout v-else>
    <h1>hola {{ user.name }}</h1>
    <button @click="logout">log out</button>
  </Layout>
</template>

<style scoped></style>
