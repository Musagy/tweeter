<template>
  <main>
    <p>
      {{ post.content }}
    </p>
    <img v-if="post.image" :src="post.image" :alt="'image-post-' + post.id" />
    <div class="counters">
      <p>{{ post._count.replies }} Comentarios</p>
      <p>{{ post._count.retweets }} Retweets</p>
      <p>{{ post._count.saves }} Guardados</p>
    </div>
    <hr />
    <div class="post-interactions__ctn">
      <InteractionBtn
        v-for="interaction in interactions"
        :initState="false"
        :interaction="interaction"
        :postId="post.id"
      />
    </div>
    <hr />
  </main>
</template>

<script setup lang="ts">
  import { Post } from "../types/Model"
  import { interactions } from "../utils/postInteractions"
  import InteractionBtn from "./InteractionBtn.vue"

  const { post } = defineProps<{
    post: Post
  }>()
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
    margin: -10px 0;
  }
  hr {
    border: 1px solid #f2f2f2;
  }
</style>
