import { defineStore } from "pinia"
import { ref } from "vue"
import { Post } from "../types/Model"

export const usePostModalStore = defineStore("post modal", () => {
  // Declarando estados para el usuario
  const isOpen = ref<boolean>(false)
  const options = ref<{
    parentId?: number
    retweetId?: number
  }>({})
  const unshifter = ref<(newPost: Post) => void>((_newPost: Post) => {})

  /**
   * Esto retorna una configuracion para el modal del creador de post
   */
  function openModal(
    refPostId: number,
    typeReq: "reply" | "retweet",
    setUnshifter?: (newPost: Post) => void
  ) {
    if (setUnshifter !== undefined) {
      unshifter.value = setUnshifter
    }
    const propName = typeReq === "reply" ? "parentId" : "retweetId"
    options.value = { [propName]: refPostId }

    isOpen.value = true
  }
  function closeModal() {
    unshifter.value = (_newPost: Post) => {}
    isOpen.value = false
    options.value = {}
  }
  return { isOpen, options, openModal, closeModal, unshifter }
})
