<template>
  <div>
    <h2>Cambiar contraseña</h2>
    <form @submit.prevent="changePassword" ref="formChangePassword">
      <input
        type="password"
        placeholder="Antigua Contraseña"
        v-model="stateNewPassword.currentPassword"
      />
      <input
        type="password"
        placeholder="Nueva Contraseña"
        v-model="stateNewPassword.newPassword"
      />
      <input
        type="password"
        placeholder="Repetir Contraseña"
        v-model="stateNewPassword.repeatPassword"
      />
      <button type="submit">Cambiar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios"
  import { ref } from "vue"
  import { useToast } from "vue-toastification"
  import { User } from "../types/Model"

  const toast = useToast()
  const newPasswordDefault = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  }
  const formChangePassword = ref<HTMLFormElement>()
  const stateNewPassword = ref<{
    currentPassword: string
    newPassword: string
    repeatPassword: string
  }>(newPasswordDefault)

  const changePassword = async () => {
    const { currentPassword, newPassword, repeatPassword } =
      stateNewPassword.value
    if (newPassword !== repeatPassword)
      return toast("Las contraseñas no coinciden")

    const userRaw = <string>localStorage.getItem("user")
    const user = <User>JSON.parse(userRaw)
    const { username } = user

    const { VITE_API } = import.meta.env
    const url = VITE_API + "/user/change-password"
    try {
      const { data } = await axios.patch(url, {
        currentPassword,
        newPassword,
        username,
      })
      toast(data.message)
    } catch (err: any) {
      if (err.response.data) {
        toast.error(err.response.data.error)
      }
    }
    stateNewPassword.value = newPasswordDefault
    formChangePassword.value?.reset()
  }
</script>

<style scoped>
  form {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  form input {
    background-color: white;
    border: none;
    padding: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  form input::placeholder {
    background-color: white;
    color: #bdbdbd;
  }
  form input:focus {
    outline: none;
  }
  form button {
    background: #2f80ed;
    color: white;
    padding: 12px 24px;
    height: min-content;
    border: none;
    border-radius: 8px;
  }
</style>
