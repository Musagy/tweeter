<template>
  <article>
    <PostHeader :post="post" />
    <PostMain :post="post" />
    <PostFooter :post="post" />
  </article>
</template>

<script setup lang="ts">
  import { Post } from "../types/Model"
  import PostFooter from "./PostFooter.vue"
  import PostHeader from "./PostHeader.vue"
  import PostMain from "./PostMain.vue"

  const { post } = defineProps<{
    post: Post
  }>()
</script>

<style scoped>
  article {
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
