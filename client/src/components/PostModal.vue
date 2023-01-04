<template>
  <section class="post-modal__Ctn" v-if="isOpen">
    <button class="post-model-bg" @click="closeModal" />
    <CreatePost
      :additionalContent="options"
      :title="title"
      @unshifter="unshifter"
      @afterAll="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia"
  import { computed, watch } from "vue"
  import { usePostModalStore } from "../store/usePostModalStore"
  import CreatePost from "./CreatePost.vue"

  const modalStore = usePostModalStore()
  const { isOpen, options, unshifter } = storeToRefs(modalStore)
  const { closeModal } = modalStore

  const title = computed(() => {
    if (options.value.parentId) return "¿Que va a comentar?"
    if (options.value.retweetId) return "¿Que comentaras para el retweet?"
  })
</script>

<style scoped>
  .post-modal__Ctn {
    /* background-color: hsl(0, 0%, 0%, 50%); */
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;

    display: grid;
    place-items: center;
  }
  .post-model-bg {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: hsl(0, 0%, 0%, 50%);
  }
  .post-modal__Ctn :deep(.ctn) {
    max-width: 636px;
    width: 100%;
    z-index: 2;
  }
</style>
