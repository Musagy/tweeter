<template>
  <div class="user__banner">
    <img v-if="user?.banner" :src="user.banner" alt="user-banner" />
  </div>
  <div class="user">
    <div class="avatar-ctn">
      <Avatar
        v-if="user"
        :photo="user?.avatar"
        :userId="user.id"
        size="152px"
      />
    </div>
    <div class="user__info">
      <header>
        <div class="follow-info">
          <h1>{{ user?.name }}</h1>
          <h2>
            <span>{{ user?._count.followers }}</span> Seguidores
          </h2>
          <h2>
            <span>{{ user?._count.following }}</span> Siguiendo
          </h2>
        </div>
        <template v-if="userCurrent.id !== user?.id">
          <button v-if="!isFollower" @click="followToggle" class="add">
            <span class="material-symbols-outlined"> person_add </span>Seguir
          </button>
          <button v-else @click="followToggle" class="remove">
            <span class="material-symbols-outlined"> person_remove </span>Dejar
            de Seguir
          </button>
        </template>
      </header>
      <p class="user-desc">
        {{ user?.desc }}
        <span v-if="user?.desc === null">No hay descripción</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios"
  import { onMounted, ref } from "vue"
  import { useToast } from "vue-toastification"
  import { User } from "../types/Model"
  import authHandler from "../utils/authHandler"
  import Avatar from "./Avatar.vue"

  const { user } = defineProps<{
    user: User | null
  }>()

  const userRaw = <string>localStorage.getItem("user")
  const userCurrent = <User>JSON.parse(userRaw)

  const isFollower = ref(false)

  const toast = useToast()
  const { VITE_API } = import.meta.env

  const Authorization = <string>localStorage.getItem("token")

  onMounted(async () => {
    if (user?.id) {
      const { data } = await axios.get(
        `${VITE_API}/user/is-follow/${user?.id}`,
        { headers: { Authorization } }
      )
      isFollower.value = data.isFollower
    }
  })
  const followToggle = async () => {
    try {
      const { data } = await axios.get(`${VITE_API}/user/follow/${user?.id}`, {
        headers: { Authorization },
      })
      toast(data.message)
      isFollower.value = !isFollower.value
    } catch (err: any) {
      authHandler(err, () => {
        toast.error(err.response.data.error)
      })
    }
  }
</script>

<style scoped>
  .user__banner {
    width: 100vw;
    height: 300px;
    background-color: #505c6f;
  }
  .user__banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user {
    max-width: 1072px;
    width: 100%;
    /* height: 163px; */
    margin-top: -55px;
    padding: 0 0 16px 0;

    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

    display: grid;

    grid-template-columns: 200px 1fr;
  }
  .avatar-ctn {
    width: 160px;
    height: 160px;
    place-self: center;

    background: v-bind("user ? 'white' : '#1d2736'");
    border-radius: 10px;
    margin-top: -120px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

    display: grid;
    place-content: center;
  }

  .user__info {
    display: flex;
    margin: 16px 24px 16px 0px;
    flex-direction: column;
    gap: 20px;
  }
  .user__info header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .follow-info {
    display: flex;
    gap: 26px;
    align-items: center;
  }

  .follow-info h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    color: #333333;
    font-size: 24px;
  }

  .follow-info h2 {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    color: #aaa;
  }
  .follow-info h2 span {
    font-weight: 600;
    color: #333333;
  }
  .user__info header button {
    border-radius: 4px;
    border: none;
    color: white;

    display: flex;
    align-items: center;
    gap: 5px;

    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;
    padding: 8px 24px;
  }
  .material-symbols-outlined {
    font-size: 16px;
    padding-top: 2px;
  }
  .user-desc {
    font-family: Noto Sans;
    font-size: 18px;
    font-weight: 500;

    color: #828282;
  }

  .remove {
    background-color: #ed2f2f;
  }
  .add {
    background: #2f80ed;
  }
</style>
