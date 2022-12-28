<template>
  <section class="posts">
    <Post v-for="post in posts" :post="post" />
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { Post as PostType } from "../types/Model"
  import * as PostQueries from "../utils/postQueries"
  import Post from "./Post.vue"

  const posts = ref<PostType[]>([])

  onMounted(async () => {
    const initialPosts = await PostQueries.postsOfFYP()
    console.log(initialPosts)
    posts.value = [...posts.value, ...initialPosts]
    console.log(posts.value)
  })
</script>

<style scoped>
.posts {
  display: flex;
  gap: 10px;
  flex-direction: column;

  margin-top: 24px;
}
</style>
