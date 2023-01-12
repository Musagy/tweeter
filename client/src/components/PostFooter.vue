<template>
  <footer>
    <div class="create-reply">
      <Avatar userId="user" />
      <button class="create-reply__btn" @click="createReply">
        <span>Tweetea un comentario</span>
        <span class="material-symbols-outlined"> image </span>
      </button>
    </div>
    <template v-if="post.replies.length > 0">
      <hr />
      <div class="replies__ctn">
        <Reply v-for="reply in post.replies" :post="reply" :id="reply.id" />
      </div>
      <template v-if="post._count.replies > (isIndividualPost ? 10 : 3)">
        <hr />
        <RouterLink :to="'/post/' + post.id" class="to-full-post"
          >Ver más comentarios</RouterLink
        >
      </template>
    </template>
  </footer>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router"
  import { usePostModalStore } from "../store/usePostModalStore"
  import type { Post } from "../types/Model"
  import Avatar from "./Avatar.vue"
  import Reply from "./Reply.vue"

  const { post } = defineProps<{
    post: Post
  }>()
  const isIndividualPost = useRoute().path.startsWith("/post/")

  const modalStore = usePostModalStore()
  const { openModal } = modalStore

  const unshifter = (newPost: Post) => post.replies.unshift(newPost)
  const createReply = () => {
    openModal(post.id, "reply", unshifter)
  }
</script>

<style scoped>
  footer {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
  .create-reply {
    display: flex;
    gap: 16px;
  }
  .create-reply__btn {
    background: #fafafa;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    height: 40px;

    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    color: #bdbdbd;

    font-family: Noto Sans;
    font-size: 14px;
    font-weight: 500;

    padding-left: 10px;
  }
  .replies__ctn {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .to-full-post {
    color: #777;
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    padding: 4px 0;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
    margin-top: 3px;
  }
  hr {
    margin: -2px 0;
    border: 1px solid #f2f2f2;
  }
</style>
