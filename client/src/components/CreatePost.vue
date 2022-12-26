<template>
  <div class="ctn">
    <h2>Tweetea algo</h2>
    <hr />
    <form class="form-ctn" @submit.prevent="handlerSubmit">
      <img :src="photo" alt="profile-image" />
      <textarea
        placeholder="¿Qué está pasando?"
        @input="resize()"
        v-model="content"
        ref="textarea"
      />
      <div class="post-setting">
        <div class="post-custom">
          <button @click="addImage">
            <span class="material-symbols-outlined"> image </span>
          </button>
          <PrivacyBtn @setPublic="setPublic" />
        </div>
        <button type="submit">Tweet</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios"
  import { Ref, ref } from "vue"
  import { useToast } from "vue-toastification"
  import PrivacyBtn from "./privacyBtn.vue"
  import * as PostQueries from "../utils/postQueries"

  // TextArea auto-resize
  let textarea = <Ref<HTMLTextAreaElement>>ref()
  const resize = () => {
    textarea.value.style.height = "18px"
    textarea.value.style.height = textarea.value.scrollHeight + "px"
  }

  // Obteniendo a user del local storage
  const userRaw = <string>localStorage.getItem("user")

  // Obteniendo foto
  const photo =
    JSON.parse(userRaw).photo ||
    "https://osu.ppy.sh/images/layout/avatar-guest@2x.png"

  // Referencia del contenido del post
  const content = ref("")

  const addImage = () => {}

  const isPublic = ref(true)

  const setPublic = (value: boolean) => (isPublic.value = value)

  const handlerSubmit = async () => PostQueries.createPost(content, isPublic)
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
    width: 40px;
    height: 40px;
    filter: invert(1);
    border-radius: 8px;
  }

  textarea {
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: 500;

    width: 100%;
    border: none;

    border-radius: 10px;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  textarea::-webkit-scrollbar {
    width: 0;
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
    font-size: 20px;
  }
</style>
