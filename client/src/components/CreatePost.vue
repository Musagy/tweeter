<template>
  <div class="ctn">
    <h2>{{ title ?? "Tweetea algo" }}</h2>
    <hr />
    <form class="form-ctn" @submit.prevent="handlerSubmit" ref="form">
      <Avatar userId="user" />
      <div>
        <PostContentInput @setContent="setContent" />
        <div class="display-image">
          <button type="button" class="delete-image" @click="deleteImage">
            <span class="material-symbols-outlined"> close </span>
          </button>
          <img v-if="imageUrl !== ''" :src="imageUrl" />
        </div>
      </div>
      <div class="post-setting">
        <div class="post-custom">
          <button @click="openFileSelector" type="button">
            <span class="material-symbols-outlined"> image </span>
          </button>
          <input
            type="file"
            ref="fileInput"
            @change="setImage"
            style="display: none"
          />
          <PrivacyBtn @setPublic="setPublic" />
        </div>
        <button type="submit">Tweet</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue"
  import PrivacyBtn from "./PrivacyBtn.vue"
  import PostContentInput from "./PostContentInput.vue"
  import * as PostQueries from "../utils/postQueries"
  import Avatar from "./Avatar.vue"
  import type { Post, AdditionalContent } from "../types/Model"

  const { additionalContent, title } = defineProps<{
    additionalContent?: AdditionalContent
    title?: string
  }>()

  const emit = defineEmits<{
    (e: "unshifter", newPost: Post): void
    (e: "afterAll"): void
  }>()

  // Referencia del contenido del post
  const content = ref("")
  const image = ref<File | null>(null)
  const isPublic = ref(true)

  const imageUrl = ref("")

  const fileInput = ref<HTMLInputElement | null>(null)
  const openFileSelector = () => fileInput.value?.click()

  const form = ref<HTMLFormElement>()

  const setPublic = (value: boolean) => (isPublic.value = value)
  const setContent = (value: string) => (content.value = value)
  const setImage = (event: Event) => {
    // Accede al archivo seleccionado a través del evento "change"
    const files = (event.target as HTMLInputElement).files

    if (files == null) return null

    const file = files[0]
    image.value = file
  }
  const deleteImage = () => (image.value = null)
  watch(image, () => {
    if (!image.value) return (imageUrl.value = "")
    imageUrl.value = URL.createObjectURL(image.value)
  })

  const handlerSubmit = async () => {
    const newPost = await PostQueries.createPost(
      content.value,
      isPublic.value,
      image.value,
      {
        parentId: additionalContent?.parentId,
        retweetId: additionalContent?.retweetId,
      }
    )
    if (!newPost) return null

    emit("unshifter", newPost)

    if (emit("afterAll") !== null) emit("afterAll")

    deleteImage()
    form.value?.reset()
  }
</script>

<style scoped>
  .ctn {
    /* diseño */
    background-color: white;
    box-shadow: 0px 2px 4px 0px #0000000d;
    border-radius: 12px;

    /* margenes */
    padding: 12px 20px;
  }
  h2 {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 600;
  }
  hr {
    margin: 4px 0 8px;
    border: 1px solid #e0e0e0;
  }
  .form-ctn {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-template-rows: auto 32px;
    gap: 12px;
  }
  img {
    width: 100%;
    /* height: 40px; */
    border-radius: 8px;
  }
  .display-image {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .delete-image {
    background-color: #0008;
    border: none;
    padding: 4px 0px 0;
    border-radius: 90px;
    width: 40px;
    height: 40px;
    position: absolute;
    color: white;
    right: 10px;
    top: 10px;
  }
  .post-setting {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;

    grid-column: 2;

    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  :global(.post-setting button) {
    display: inline-flex;
    align-items: center;
    height: 32px;

    border: none;
    border-radius: 8px;
    color: #2f80ed;
    background: none;
    gap: 5px;
  }
  :global(.post-custom button:hover) {
    background: #f2f2f2;
  }
  .post-setting button[type="submit"] {
    background: #2f80ed;
    color: white;
    padding: 0 24px;
    border-radius: 4px;
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
    font-size: 24px;
  }
</style>
