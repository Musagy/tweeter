<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <main>
      <CreatePost @unshifter="unshifter" />
      <ForYouPage />
    </main>
    <aside>
      <!-- <Trends/> -->
    </aside>
  </Layout>
</template>

<script setup lang="ts">
  import Layout from "../components/Layout.vue"
  import CreatePost from "../components/CreatePost.vue"
  import ForYouPage from "../components/ForYouPage.vue"
  // import Trends from '../components/Trends.vue';
  import { useUserNewPosts } from "../store/useUserNewPosts"
  import { Post } from "../types/Model"

  const { insertNewPost } = useUserNewPosts()
  const unshifter = (newPost: Post) => insertNewPost(newPost)
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
