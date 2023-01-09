<template>
  <section class="posts">
    <template v-if="allGroupsPost[1].length > 0" v-for="posts in allGroupsPost">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </template>
    <Loading v-else />
    <LoadMorePostBtnVue
      v-if="allGroupsPost[1].length > 0"
      @setAllPagePost="pushInAllPagePost"
      :queryPost="PostQueries.postsOfFYP"
    />
  </section>
</template>

<script setup lang="ts">
  import type { Post as PostType } from "../types/Model"
  import Post from "./Post.vue"
  import { computed, onMounted, ref } from "vue"
  import * as PostQueries from "../utils/postQueries"
  import { useUserNewPosts } from "../store/useUserNewPosts"
  import { storeToRefs } from "pinia"
  import Loading from "./Loading.vue"
  import LoadMorePostBtnVue from "./LoadMorePostBtn.vue"

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
    if (initialPosts !== undefined) allPagePost.value = [initialPosts]
  })

  const pushInAllPagePost = (newPosts: PostType[]) =>
    allPagePost.value.push(newPosts)
</script>

<style scoped>
  .posts {
    display: flex;
    gap: 10px;
    flex-direction: column;

    margin-top: 24px;
  }
</style>
