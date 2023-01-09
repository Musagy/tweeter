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
      <form id="search" @submit.prevent="handler">
        <span class="material-symbols-outlined"> search </span>
        <input
          type="text"
          class="search__input"
          placeholder="Buscar..."
          v-model="whatSearch"
        />
        <button class="search__submit">Buscar</button>
      </form>

      <div class="results">
        <Loading v-if="loading" />
        <p v-else-if="postsFound[0].length === 0">Busca algo</p>
        <template v-else v-for="loadedPosts in postsFound">
          <Post v-for="post in loadedPosts" :post="post" :key="post.id" />
        </template>
        <LoadMorePostBtn
          v-if="postsFound[0].length > 0"
          @setAllPagePost="pushInAllPagePost"
          :queryPost="fetchPost"
        />
      </div>
    </main>
  </Layout>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import Layout from "../components/Layout.vue"
  import Post from "../components/Post.vue"
  import FiltersCtn from "../components/FilterCtn.vue"
  import { useRoute, useRouter } from "vue-router"
  import type { Post as PostType } from "../types/Model"
  import { searchPost } from "../utils/postQueries"
  import LoadMorePostBtn from "../components/LoadMorePostBtn.vue"
  import Loading from "../components/Loading.vue"

  const filters = [
    {
      type: "Popular",
      query: "Top",
    },
    {
      type: "Recientes",
      query: "Lastest",
    },
    {
      type: "Personas",
      query: "People",
    },
    {
      type: "Con multimedia",
      query: "Media",
    },
  ]

  const filterType = ref("Top")
  const setFilter = (filter: string) => (filterType.value = filter)

  const postsFound = ref<PostType[][]>([[]])

  const whatSearch = ref<string>("")
  const loading = ref(false)

  const { replace } = useRouter()
  const { params } = useRoute()

  const handler = async () => {
    replace("/search/" + whatSearch.value)
    loading.value = true
    postsFound.value = [[]]
    const res = await fetchPost()
    if (res !== undefined) {
      postsFound.value[0] = res
      loading.value = false
    }
  }
  const fetchPost = async (page: number = 1) => {
    return await searchPost(whatSearch.value, filterType.value, page)
  }

  onMounted(async () => {
    if (params?.search) {
      loading.value = true
      whatSearch.value = `${params?.search}`
      const res = await fetchPost()
      if (res !== undefined) {
        postsFound.value[0] = res
        loading.value = false
      }
    }
  })

  const pushInAllPagePost = (newPosts: PostType[]) =>
    postsFound.value.push(newPosts)
</script>

<style scoped>
  main {
    max-width: 745px;
    width: 100%;
  }
  #search {
    max-width: 745px;

    display: flex;
    gap: 32px;
    width: 100%;

    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 12px;

    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;

    align-items: center;

    margin-bottom: 20px;
  }

  .search__input {
    background: none;
    font-size: 16px;
    border: none;
    width: 100%;
  }

  .search__input:focus {
    outline: none;
  }

  .search__input::placeholder {
    color: #bdbdbd;
  }

  .search__submit {
    background: #2f80ed;
    border-radius: 4px;
    color: white;
    border: none;
    padding: 8px 24px;
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
    color: #bdbdbd;
  }
</style>
