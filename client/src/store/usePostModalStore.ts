import { defineStore } from "pinia"
import { ref } from "vue"

export const usePostModalStore = defineStore("post modal", () => {
  // Declarando estados para el usuario
  const isOpen = ref<boolean>(false)
  const options = ref<{
    parentId?: number
    retweetId?: number
  }>({})

  /**
   * Esto retorna una configuracion para el modal del creador de post
   */
  function openModal(refPostId: number, typeReq: "reply" | "retweet") {
    const propName = typeReq === "reply" ? "parentId" : "retweetId"
    options.value = { [propName]: refPostId }

    isOpen.value = true
  }
  function closeModal() {
    isOpen.value = false
    options.value = {}
  }
  return { isOpen, options, openModal, closeModal }
})
