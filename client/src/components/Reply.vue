<template>
  <article>
    <Avatar :photo="post.author.avatar" :user-id="post.authorId" />
    <div class="reply">
      <div class="reply__content">
        <div class="reply-info">
          <b>{{ post.author.username }}</b>
          <span>{{ date }}</span>
        </div>
        <p>{{ post.content }}</p>
      </div>
      <div class="interaction">
        <button @click="handler" :class="{ active: isActive }">
          <span class="material-symbols-outlined"> {{ like.icon }} </span>
          {{ like.title }}
        </button>
        <span>· {{ post._count.favorites }} Me gustas </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { Post } from "../types/Model"
  import Avatar from "./Avatar.vue"
  import { interactions } from "../utils/postInteractions"
  import { ref } from "vue"
  const like = interactions[2]

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

  const isActive = ref(!!post.favorites.length)
  const handler = () => {
    like.handler(post.id)
    isActive.value = !isActive.value
  }
</script>

<style scoped>
  article {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 16px;
  }
  .reply {
    display: flex;
    gap: 4px;
    flex-direction: column;
  }

  .reply__content {
    background: #f7f7f7;
    padding: 15px 12px;
    border-radius: 8px;
  }

  .reply-info {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .reply-info b {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 500;
  }
  .reply-info span {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;
    color: #bdbdbd;
  }
  .reply__content p {
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: 400;
  }
  .interaction {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .interaction:last-child {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 600;
    color: #bdbdbd;
    margin-top: 2px;
  }

  .active {
    color: v-bind("like.color");
  }
  .material-symbols-outlined {
    font-size: 16px;
    font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
    margin-top: 2px;
  }
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    background: none;
    border: none;
    border-radius: 8px;
    padding: 4px;

    margin-left: -4px;

    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 600;
    color: #bdbdbd;
  }
  button:hover {
    background: #f2f2f2;
  }
</style>
