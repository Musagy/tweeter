<template>
  <NavComp />
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import NavComp from "./Nav.vue"
</script>

<style scoped>
main {
  background: #f2f2f2;
  width: 100%;
  min-height: calc(100vh - 68px);
  padding-top: 68px;
}
</style>
