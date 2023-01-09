<script setup lang="ts">
  import { onMounted } from "vue"
  import { useAuthStore } from "./store/useAuthStore"

  onMounted(() => {
    useAuthStore().setNewToken()
  })
</script>

<template>
  <router-view />
</template>

<style scoped></style>
