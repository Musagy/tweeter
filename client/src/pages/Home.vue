<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <main>
      {{ a }}
      <CreatePost @unshifter="unshifter" />
      <ForYouPage />
    </main>
    <aside>
      <Trends />
    </aside>
  </Layout>
</template>

<script setup lang="ts">
  import Layout from "../components/Layout.vue"
  import CreatePost from "../components/CreatePost.vue"
  import ForYouPage from "../components/ForYouPage.vue"
  import Trends from "../components/Trends.vue"
  import type { Post } from "../types/Model"
  import { useUserNewPosts } from "../store/useUserNewPosts"

  const { insertNewPost } = useUserNewPosts()
  const a = import.meta.env.VITE_API
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
    /* background-color: darkcyan; */
  }
</style>
