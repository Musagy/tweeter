import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { User } from "../types/Model"
import { LoginResponse } from "../types/LoginForm"
import { useRouter } from "vue-router"

export const useAuthStore = defineStore("auth", () => {
  // Declarando estados para el usuario
  const token = ref<string>("")
  const user = ref<User | null>(null)

  // inicializacion al iniciar app
  const userSet = localStorage.getItem("user")
  const tokenSet = localStorage.getItem("token")
  if (userSet && tokenSet) {
    user.value = JSON.parse(userSet)
    token.value = tokenSet
  }

  // mirar user para que actualice los localStorage
  watch(
    user,
    userVal => {
      localStorage.setItem("user", userVal ? JSON.stringify(userVal) : "")
      localStorage.setItem("token", token.value)
    },
    { deep: true }
  )

  // creamos un Router para que envien a las rutas respectivas
  const router = useRouter()

  function login(data: LoginResponse) {
    const { token: newToken, user: newUser } = data
    if (newToken && user) {
      token.value = newToken
      user.value = newUser
      router.push("/")
    }
  }
  function logout() {
    token.value = ""
    user.value = null
    router.push("/login")
  }
  return { token, user, login, logout }
})
