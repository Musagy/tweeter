import { defineStore } from "pinia"
import { ref } from "vue"
import { Post } from "../types/Model"

export const useUserNewPosts = defineStore("user new posts", () => {
  const newPosts = ref<Post[]>([])

  const insertNewPost = (newPost: Post) => {
    newPosts.value.push(newPost)
  }
  return {newPosts, insertNewPost}
})
