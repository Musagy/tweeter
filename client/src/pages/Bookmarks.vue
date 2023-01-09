<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <FiltersCtn @setFilter="setFilter" :filters="filters" />
    <main>
      <template v-if="postsFound.length > 0" v-for="loadedPosts in postsFound">
        <Post v-for="post in loadedPosts" :post="post" :key="post.id" />
      </template>
      <Loading v-else />
    </main>
  </Layout>
</template>

<script setup lang="ts">
  import Layout from "../components/Layout.vue"
  import FiltersCtn from "../components/FilterCtn.vue"
  import type { Post as PostType } from "../types/Model"
  import { onMounted, ref, watch } from "vue"
  import Post from "../components/Post.vue"
  import Loading from "../components/Loading.vue"
  import { bookmarksPost } from "../utils/postQueries"

  const filters = [
    {
      type: "Tweets",
      query: "Tweets",
    },
    {
      type: "Tweets y comentarios",
      query: "TweetsNReplies",
    },
    {
      type: "Media",
      query: "Media",
    },
    {
      type: "Likes",
      query: "Likes",
    },
  ]

  type Filter = "Tweets" | "TweetsNReplies" | "Media" | "Likes"
  const filterType = ref<Filter>("Tweets")
  const setFilter = (filter: Filter) => (filterType.value = filter)

  const postsFound = ref<PostType[][]>([])

  const fetchPost = async (filter: Filter) => {
    const postPage = await bookmarksPost(filter)
    if (postPage) postsFound.value.push(postPage)
  }
  watch(filterType, async newType => {
    postsFound.value = []
    fetchPost(newType)
  })

  onMounted(() => fetchPost(filterType.value))
</script>

<style scoped>
  main {
    display: flex;
    gap: 32px;
    flex-direction: column;

    width: 100%;
    max-width: 745px;
  }
</style>
