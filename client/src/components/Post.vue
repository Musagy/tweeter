<template>
  <article>
    <PostHeader :post="post" />
    <PostMain :post="post" />
    <footer>
      <div class="create-reply">
        <Avatar userId="user" />
        <button class="create-reply__btn" @click="createReply">
          <span>Tweetea un comentario</span>
          <span class="material-symbols-outlined"> image </span>
        </button>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
  import { usePostModalStore } from "../store/usePostModalStore"
  import { Post } from "../types/Model"
  import Avatar from "./Avatar.vue"
  import PostHeader from "./PostHeader.vue"
  import PostMain from "./PostMain.vue"

  const { post } = defineProps<{
    post: Post
  }>()

  const modalStore = usePostModalStore()
  const { openModal } = modalStore
  const createReply = () => {
    openModal(post.id, "reply")
  }
</script>

<style scoped>
  article {
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 12px;
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
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
    margin-top: 3px;
  }
</style>
