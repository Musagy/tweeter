<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <main>
      <h1>Ajustes de cuenta</h1>
      <ChangePassword />
      <h2>Editar descripción de perfil</h2>
      <input
        type="text"
        id="desc"
        v-model="userUpdateData.desc"
        placeholder="Agrega una descripcion a tu cuenta"
      />
      <div class="changer">
        <div>
          <h2>Editar foto de perfil</h2>
          <label for="avatar">
            Click para seleccionar avatar
            <input type="file" id="avatar" @change="setNewAvatar" />
          </label>
        </div>
        <img class="avatar" :src="avatarUrl" alt="user-avatar" />
      </div>
      <div class="changer">
        <div>
          <h2>Editar banner de perfil</h2>
          <label for="banner">
            Click para seleccionar banner
            <input type="file" id="banner" @change="setNewBanner" />
          </label>
        </div>
        <div
          class="banner-ctn"
          :style="!bannerUrl ? { backgroundColor: '#505c6f' } : {}"
        >
          <img
            v-if="bannerUrl"
            class="banner"
            :src="bannerUrl"
            alt="user-banner"
          />
        </div>
      </div>
      <button @click="saveChanges" class>Guardar</button>
    </main>
  </Layout>
</template>

<script setup lang="ts">
  import axios from "axios"
  import { onMounted, type Ref, ref } from "vue"
  import { useToast } from "vue-toastification"
  import ChangePassword from "../components/changePassword.vue"
  import Layout from "../components/Layout.vue"
  import type { User } from "../types/Model"
  import { useAuthStore } from "../store/useAuthStore"
  import { storeToRefs } from "pinia"
  import authHandler from "../utils/authHandler"

  const toast = useToast()

  const VITE_API = import.meta.env.VITE_API

  const avatarUrl = ref("https://osu.ppy.sh/images/layout/avatar-guest@2x.png")
  const bannerUrl = ref("")
  const userUpdateDataDefault = { avatar: null, banner: null, desc: "" }
  const userUpdateData = ref<{
    avatar: File | null
    banner: File | null
    desc: string | null
    [key: string]: any
  }>(userUpdateDataDefault)

  onMounted(() => {
    const userRaw = <string>localStorage.getItem("user")
    const user = <User>JSON.parse(userRaw)
    if (user.avatar) avatarUrl.value = user.avatar
    if (user.banner) bannerUrl.value = user.banner
    if (user.desc) userUpdateData.value.desc = user.desc
  })

  const setImage = (event: Event, prop: string, stateUrl: Ref<string>) => {
    const files = (event.target as HTMLInputElement).files

    if (files == null) return null

    const file = files[0]
    userUpdateData.value[prop] = file
    stateUrl.value = URL.createObjectURL(file)
  }

  const setNewAvatar = (event: Event) => setImage(event, "avatar", avatarUrl)
  const setNewBanner = (event: Event) => setImage(event, "banner", bannerUrl)

  const authStore = useAuthStore()
  const { token, user } = storeToRefs(authStore)

  const saveChanges = async () => {
    const formData = new FormData()
    const { avatar, banner, desc } = userUpdateData.value
    if (avatar) formData.append("avatar", avatar)
    if (banner) formData.append("banner", banner)
    if (desc !== user.value?.desc) formData.append("desc", desc ?? "")

    try {
      const { status, data } = await axios.patch(
        VITE_API + "/user/change-images",
        formData,
        {
          headers: {
            Authorization: token.value,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      // Si sale un resultado distinto de 200
      if (status !== 200) {
        toast.error(data.response.data.error)
      }
      // si todo sale bien
      toast(data.message)
      user.value = { ...user.value, ...data.imageUpdate }
    } catch (err: any) {
      authHandler(err, () => {
        toast.error(err.response.data.error)
      })
    }
  }
</script>

<style scoped>
  main {
    /* height: 100vh; */
    width: 1080px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: start;
    gap: 36px;
  }
  .avatar {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
  }
  .changer {
    display: inline-flex;
    align-self: center;
    gap: 20px;
    align-items: center;
  }
  .changer div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .changer label {
    background: #2f80ed;
    color: white;
    height: min-content;
    padding: 12px 24px;

    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;

    border-radius: 8px;

    /* bottom: 200px; */
    cursor: pointer;
  }
  #avatar,
  #banner {
    display: none;
  }

  .changer div h2 {
    /* padding-bottom: 15px; */
    position: relative;
    top: -16px;
  }

  .banner-ctn {
    width: 700px;
    height: 200px;
    overflow: hidden;
    border-radius: 20px;
  }
  .banner-ctn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button {
    background: #2f80ed;
    color: white;
    padding: 12px 24px;
    height: min-content;
    border: none;
    border-radius: 8px;
    align-self: center;
  }
  input {
    background-color: white;
    border: none;
    padding: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    margin-top: -12px;
    max-width: 720px;
    width: 100%;
    align-self: center;
  }

  input::placeholder {
    background-color: white;
    color: #bdbdbd;
  }
  input:focus {
    outline: none;
  }
</style>
