<template>
  <article>
    <RouterLink v-if="post.retweetId" :to="'/post/' + post.retweetId">
      <span class="material-symbols-outlined">autorenew</span> Retweeteado por
      {{ post.author.username }}
    </RouterLink>
    <div class="post">
      <template v-if="post.retweetId === null">
        <PostHeader :post="post" />
        <PostMain :post="post" />
        <PostFooter :post="post" />
      </template>
      <template v-else>
        <PostHeader :post="post.retweeting" />
        <PostMain :post="post.retweeting" />
        <PostFooter :post="post.retweeting" />
      </template>
    </div>
  </article>
</template>

<script setup lang="ts">
  import type { Post } from "../types/Model"
  import PostFooter from "./PostFooter.vue"
  import PostHeader from "./PostHeader.vue"
  import PostMain from "./PostMain.vue"

  const { post } = defineProps<{
    post: Post
  }>()
</script>

<style scoped>
  .post {
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  }
  a {
    color: #828282;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;

    font-family: Noto Sans;
    font-size: 14px;
    font-weight: 400;
    padding: 10px 0;
  }
  span {
    font-size: 20px;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
  }
</style>
