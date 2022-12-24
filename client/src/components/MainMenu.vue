<template>
  <ul>
    <template v-for="btn in mainMenu">
      <router-link
        v-if="typeof btn.handler === 'string'"
        :to="btn.handler"
        :class="{ current: btn.handler === path }"
      >
        {{ btn.title }}
      </router-link>
    </template>
  </ul>
</template>

<script setup lang="ts">
  import { mainMenu } from "../utils/navbar"
  import { useRoute } from "vue-router"

  const { path } = useRoute()
</script>

<style scoped>
  ul {
    display: flex;
    gap: 80px;
  }
  ul a {
    text-decoration: none;

    font-family: "Poppins";
    font-weight: 600;
    font-size: 14px;

    color: #828282;

    cursor: pointer;
  }
  .current {
    color: #2f80ed;
    position: relative;
  }
  .current::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 5px;
    background-color: #2f80ed;
    top: 40px;
    right: -50%;
    border-radius: 10px 10px 0px 0px;
  }
</style>
