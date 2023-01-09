<template>
  <Layout
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <main class="main-ctn">
      <UserHero :user="user" key="hero" />
      <section class="posts-by-user">
        <FiltersCtn @setFilter="setFilter" :filters="filters" />
        <main>
          <template
            v-if="postsFound[0].length > 0"
            v-for="loadedPosts in postsFound"
          >
            <Post v-for="post in loadedPosts" :post="post" :key="post.id" />
          </template>
          <Loading v-else />
          <LoadMorePostBtn
            v-if="postsFound[0].length > 0"
            @setAllPagePost="pushInAllPagePost"
            :queryPost="fetchPost"
          />
        </main>
      </section>
    </main>
  </Layout>
</template>

<script setup lang="ts">
  import axios from "axios"
  import { onMounted, ref, watch } from "vue"
  import { useRoute } from "vue-router"
  import FiltersCtn from "../../components/FilterCtn.vue"
  import { useToast } from "vue-toastification"
  import Post from "../../components/Post.vue"
  import Layout from "../../components/Layout.vue"
  import UserHero from "../../components/UserHero.vue"
  import { User, Post as PostType } from "../../types/Model"
  import { getPostbyUserId } from "../../utils/postQueries"
  import Loading from "../../components/Loading.vue"
  import authHandler from "../../utils/authHandler"
  import LoadMorePostBtn from "../../components/LoadMorePostBtn.vue"

  const { VITE_API } = import.meta.env
  const toast = useToast()

  const { params } = useRoute()
  const user = ref<User | null>(null)

  onMounted(async () => {
    try {
      const { data } = await axios.get(VITE_API + "/user/" + params.id)
      user.value = <User>data
    } catch (err: any) {
      authHandler(err, () => {
        toast.error(err.response.data)
      })
    }
  })

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

  const postsFound = ref<PostType[][]>([[]])

  const fetchPost = async (page: number = 1) => {
    return await getPostbyUserId(filterType.value, +params.id, page)
  }
  onMounted(async () => {
    const postPage = await fetchPost()
    if (postPage) postsFound.value[0] = postPage
  })

  watch(filterType, async newFilter => {
    postsFound.value = [[]]
    const postPage = await fetchPost()
    if (postPage) postsFound.value[0] = postPage
  })

  const pushInAllPagePost = (newPosts: PostType[]) =>
    postsFound.value.push(newPosts)
</script>

<style scoped>
  .main-ctn {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100vw;
  }
  .posts-by-user {
    max-width: 1072px;
    width: 100%;
    display: flex;

    margin-top: 26px;
    justify-content: space-between;
  }
  .posts-by-user main {
    width: 100%;
    max-width: 745px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
