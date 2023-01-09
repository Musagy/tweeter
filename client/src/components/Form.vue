<template>
  <form @submit.prevent="handlerSubmit">
    <div class="input" v-for="input in inputs">
      <span class="material-symbols-outlined"> {{ input.icon }} </span>
      <input
        v-model="formData[input.state]"
        :placeholder="input.placeholder"
        :type="input.type || 'text'"
      />
    </div>
    <button type="submit">Ingresar</button>
  </form>
</template>

<script setup lang="ts">
  import { ref, type Ref } from "vue"
  import type { FormData } from "../types/LoginForm"
  import axios from "axios"
  import { useToast } from "vue-toastification"
  import { useAuthStore } from "../store/useAuthStore"
  import { useRouter } from "vue-router"
  import type { Input } from "../utils/signForms"
  import authHandler from "../utils/authHandler"

  const { inputs, typeForm } = defineProps<{
    inputs: Input[]
    typeForm: string
  }>()

  const toast = useToast()
  const router = useRouter()

  const { login } = useAuthStore()

  const initialData = inputs.reduce((obj, item) => {
    return { ...obj, [item.state]: "" }
  }, {})

  const formData: Ref<FormData> = ref(initialData)

  const errHandler: Ref<string> = ref("")
  const { VITE_API } = import.meta.env

  const handlerSubmit = async () => {
    try {
      const { data } = await axios.post(
        VITE_API + "/auth/" + typeForm,
        formData.value
      )

      // Guardar el token en el LocalStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      login(data)
      toast(data.message)

      router.push("/")
    } catch (err: any) {
      authHandler(err, () => {
        console.log(err)
        if (err.response.data) {
          errHandler.value = err.response.data.error
          toast.error(errHandler.value)
        }
      })
    }
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 34px 0;
  }
  .input {
    color: #828282;
    display: flex;
    align-items: center;
    padding: 14px 0;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    width: 100%;
  }
  .input :first-child {
    margin-left: 14px;
  }
  .input :last-child {
    margin-right: 14px;
  }
  span {
    width: 20px;
    height: 20px;
    padding-bottom: 2px;
    margin-right: 12px;
  }
  input {
    border: none;
  }
  input:focus {
    outline: none;
    width: 1000%;
  }
  button {
    width: 100%;
    color: white;
    border: none;
    padding: 9.5px 0;
    background: #2f80ed;
    border-radius: 8px;
  }
  .register {
    text-align: center;
  }
</style>
