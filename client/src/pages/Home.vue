<template>
  <Layout>
    <h1>hola {{ user?.name }}</h1>
    <button @click="logout">log out</button>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../components/Layout.vue';
import { storeToRefs } from "pinia"
import { useAuthStore } from "../store/useAuthStore"

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { logout } = authStore


// onBeforeMount(() => {
//   if(user.value?.id === undefined) router.push("/login")
// })
console.log(user)
</script>

<style scoped>

</style>