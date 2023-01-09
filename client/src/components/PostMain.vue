<template>
  <main>
    <p @click="clickToPost">
      {{ post.content }}
    </p>
    <img v-if="post.image" :src="post.image" :alt="'image-post-' + post.id" class="post-image" />
    <div class="counters" @click="clickToPost">
      <p>{{ post._count.replies }} Comentarios</p>
      <p>{{ post._count.retweets }} Retweets</p>
      <p>{{ post._count.saves }} Guardados</p>
    </div>
    <hr />
    <div class="post-interactions__ctn">
      <InteractionBtn
        v-for="(interaction, index) in interactions"
        :interaction="interaction"
        :post="post"
        :key="index"
      />
    </div>
    <hr />
  </main>
</template>

<script setup lang="ts">
  import type { Post } from "../types/Model"
  import { interactions } from "../utils/postInteractions"
  import InteractionBtn from "./InteractionBtn.vue"
  import { useRoute, useRouter } from "vue-router"

  const { post } = defineProps<{
    post: Post
  }>()

  const { push } = useRouter()
  const { path } = useRoute()
  const clickToPost = () => {
    if (!path.startsWith("/post/"))
      push(`/post/${post.retweetId === null ? post.id : post.retweeting.id}`)
  }
</script>

<style scoped>
  main {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
  p {
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: 400;
  }
  .post-image {
    border-radius: 8px;
  }
  .counters {
    display: flex;
    align-self: flex-end;
    gap: 16px;
  }
  .counters p {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;

    color: #bdbdbd;
  }

  .post-interactions__ctn {
    /* width: 100%; */
    display: flex;
    justify-content: space-evenly;
  }
  hr {
    margin: -4px 0;
    border: 1px solid #f2f2f2;
  }
</style>
