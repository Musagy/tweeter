import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { User } from "../types/Model"
import { LoginResponse } from "../types/LoginForm"

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>("")
  const user = ref<User | null>(null)

  const userSet = localStorage.getItem("user")
  const tokenSet = localStorage.getItem("token")
  if (userSet && tokenSet) {
    user.value = JSON.parse(userSet)
    token.value = tokenSet
  }

  watch(
    user,
    userVal => {
      localStorage.setItem("user", JSON.stringify(userVal))
      localStorage.setItem("token", token.value)
    },
    { deep: true }
  )

  function login(data: LoginResponse) {
    const { token: newToken, user: newUser } = data
    if (newToken && user) {
      token.value = newToken
      user.value = newUser
    }
  }
  function logout() {
    token.value = ""
    user.value = null
  }
  return { token, user, login, logout }
})
