<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <SearchFilter @setFilter="setFilter" />
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
        <template
          v-if="postsFound.length > 0"
          v-for="loadedPosts in postsFound"
        >
          <Post v-for="post in loadedPosts" :post="post" :key="post.id" />
        </template>
      </div>
    </main>
  </Layout>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import Layout from "../components/Layout.vue"
  import Post from "../components/Post.vue"
  import SearchFilter from "../components/SearchFilter.vue"
  import { useRoute, useRouter } from "vue-router"
  import { Post as PostType } from "../types/Model"
  import { searchPost } from "../utils/postQueries"

  const filterType = ref("Top")
  const setFilter = (filter: string) => (filterType.value = filter)

  const postsFound = ref<PostType[][]>([])

  const whatSearch = ref<string>("")

  const { replace } = useRouter()
  const { params } = useRoute()

  const handler = () => {
    replace("/search/" + whatSearch.value)
    fetchPost()
  }
  const fetchPost = async () => {
    const res = await searchPost(whatSearch.value, filterType.value)
    postsFound.value = []
    postsFound.value.push(res)
  }

  onMounted(() => {
    if (params?.search) {
      whatSearch.value = `${params?.search}`
      fetchPost()
    }
  })
</script>

<style scoped>
  main {
    max-width: 745px;
    width: 100%;
  }
  #search {
    width: 100%;
    max-width: 745px;

    display: flex;
    gap: 12px;
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

  .results{
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
    color: #bdbdbd;
  }
</style>
