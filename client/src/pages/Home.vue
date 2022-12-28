<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <main>
      <CreatePost />
      <ForYouPage />
    </main>
    <aside>
      <!-- <Trend/> -->
    </aside>
  </Layout>
</template>

<script setup lang="ts">
  import Layout from "../components/Layout.vue"
  import CreatePost from "../components/CreatePost.vue"
  import ForYouPage from "../components/ForYouPage.vue"
  // import Trend from '../components/Trend.vue';
</script>

<style scoped>
  main {
    max-width: 745px;
    width: 100%;
    /* background-color: chocolate; */
  }
  aside {
    max-width: 306px;
    width: 100%;
    background-color: darkcyan;
  }
</style>
