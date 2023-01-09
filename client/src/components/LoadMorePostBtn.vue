<template>
  <div class="ctn">
    <button v-if="display && !isLoading" @click="loadMorePosts">
      Cargar más posts
    </button>
    <Loading v-if="isLoading" height="80px" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import type { Post } from "../types/Model"
  import Loading from "./Loading.vue"

  const display = ref(true)
  const isLoading = ref(false)

  const { queryPost } = defineProps<{
    queryPost: (page: number) => Promise<[] | Post[] | undefined>
  }>()

  const emit = defineEmits<{
    (e: "setAllPagePost", newPosts: Post[]): void
  }>()
  const currentPage = ref<{ state: number }>({ state: 1 })

  const loadMorePosts = async () => {
    isLoading.value = true
    currentPage.value.state++
    const morePosts = await queryPost(currentPage.value.state)
    if (morePosts === undefined) return

    emit("setAllPagePost", morePosts)
    if (morePosts.length < 10) display.value = false
    isLoading.value = false
  }
</script>

<style scoped>
  .ctn {
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px;
    align-self: center;
  }
  button {
    background: #2f80ed;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
  }
</style>
