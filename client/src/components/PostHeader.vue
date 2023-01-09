<template>
  <header>
    <Avatar :photo="post.author.avatar" :user-id="post.authorId" />
    <span>{{ post.author.username }}</span>
    <p>{{ date }}</p>
  </header>
</template>

<script setup lang="ts">
  import type { Post } from "../types/Model"
  import Avatar from "./Avatar.vue"

  const { post } = defineProps<{
    post: Post
  }>()

  const createdAt = new Date(post.createdAt)

  const formattedDate = createdAt.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedTime = createdAt.toLocaleString("es-ES", {
    hour: "numeric",
    minute: "2-digit",
  })

  const date = formattedDate + " a las " + formattedTime
</script>

<style scoped>
  header {
    display: grid;

    grid-template-columns: 40px 1fr;
    grid-template-rows: 24px 16px;
    column-gap: 16px;
  }
  span {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
  }
  p {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;

    color: #bdbdbd;
    grid-column-start: 2;
  }
</style>
