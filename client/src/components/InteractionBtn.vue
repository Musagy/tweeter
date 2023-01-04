<template>
  <button @click="() => handler(post.id)" :class="{ active: isActive }">
    <span class="material-symbols-outlined"> {{ interaction.icon }} </span>
    {{ interaction.title }}
  </button>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { Post } from "../types/Model"
  import { Interaction } from "../utils/postInteractions"
  const { interaction, post } = defineProps<{
    interaction: Interaction
    // initState: boolean
    post: Post
  }>()

  const isActive = ref(
    interaction.postRef === undefined
      ? false
      : !!post[interaction.postRef].length
  )
  const retweetId = ref(
    interaction.postRef === "retweets" && post.retweets.length
      ? post.retweets[0].id
      : 0
  )

  const handler = async (id: number) => {
    if (interaction.postRef !== "retweets") {
      interaction.handler(id)
    } else {
      const newRetweetId = await (<Promise<number>>(
        interaction.handler(id, retweetId.value)
      ))
      if (newRetweetId !== undefined) {
        retweetId.value = newRetweetId
      }
    }
    isActive.value = !isActive.value
  }
</script>

<style scoped>
  .active {
    color: v-bind("interaction.color");
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 164px;

    background: none;
    border: none;
    border-radius: 8px;
    padding: 12px 0;

    font-family: Noto Sans;
    font-size: 14px;
    font-weight: 500;
    color: #4f4f4f;
  }
  button:hover {
    background: #f2f2f2;
  }
</style>
