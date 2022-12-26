<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px'
    }"
  >
    <main>
      <CreatePost :user="user" />
      <!-- <ForYouPage /> -->
    </main>
    <aside>
      <!-- <Trend/> -->
    </aside>
  </Layout>
</template>

<script setup lang="ts">
  import Layout from "../components/Layout.vue"
  import CreatePost from "../components/CreatePost.vue"
  // import ForYouPage from '../components/ForYouPage.vue';
  // import Trend from '../components/Trend.vue';
  import { storeToRefs } from "pinia"
  import { useAuthStore } from "../store/useAuthStore"

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
</script>

<style scoped>
  main {
    max-width: 745px;
    width: 100%;
    background-color: chocolate;
  }
  aside {
    max-width: 306px;
    width: 100%;
    background-color: darkcyan;
  }
</style>
