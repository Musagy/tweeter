<template>
  <main>
    <LoginModal />
  </main>
</template>

<script setup lang="ts">
import LoginModal from '../components/LoginModal.vue';
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
