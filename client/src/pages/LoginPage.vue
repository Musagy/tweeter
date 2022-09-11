<template>
  <main>
    <!-- <LoginForm /> -->
    <LoginForm v-if="!user" />
    <div v-else>
      <h1>hola {{ user.name }}</h1>
      <button @click="logout">log out</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import LoginForm from "../components/LoginForm.vue"
import { useAuthStore } from "../store/useAuthStore"

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { logout } = authStore
</script>

<style scoped>
main {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
