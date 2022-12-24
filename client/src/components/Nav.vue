<template>
  <header>
    <nav>
      <img src="/tweeter.svg" alt="logo" class="logo" />
      <MainMenu />
      <UserMenu />
    </nav>
  </header>
</template>

<script setup lang="ts">
  import MainMenu from "./MainMenu.vue"
  import UserMenu from "./UserMenu.vue"

  // const showMenu = ref(false)
</script>
<style scoped>
  header {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    position: fixed;
    background-color: white;
  }
  nav {
    margin: 0 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68px;
    width: 100%;
    max-width: 1296px;

    position: relative;
  }
  .logo {
    height: 28.77px;
  }
</style>
