<template>
  <section class="posts">
    <template v-for="posts in allGroupsPost" >
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </template>
  </section>
</template>

<script setup lang="ts">
  import { Post as PostType } from "../types/Model"
  import Post from "./Post.vue"
  import { computed, onMounted, ref } from "vue"
  import * as PostQueries from "../utils/postQueries"
  import { useUserNewPosts } from "../store/useUserNewPosts"
  import { storeToRefs } from "pinia"

  const allPagePost = ref<PostType[][]>([[]])

  const userNewPost = useUserNewPosts()
  const { newPosts } = storeToRefs(userNewPost)

  const allGroupsPost = computed<PostType[][]>(() => {
    return allPagePost.value.reduce(
      (groupPosts, pagePosts) => [...groupPosts, pagePosts],
      [newPosts.value.reverse()]
    )
  })

  onMounted(async () => {
    const initialPosts = await PostQueries.postsOfFYP()
    console.log(initialPosts)
    allPagePost.value = [initialPosts]
    console.log(allGroupsPost.value)
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
