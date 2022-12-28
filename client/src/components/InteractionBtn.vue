<template>
  <button
    @click="
      () => {
        interaction.handler(postId)
      }
    "
    :class="{ active: isActive }"
  >
    <span class="material-symbols-outlined"> {{ interaction.icon }} </span>
    {{ interaction.title }}
  </button>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { Interaction } from "../utils/postInteractions"
  const { interaction, initState } = defineProps<{
    interaction: Interaction
    initState: boolean
    postId: number
  }>()

  const isActive = ref(initState)
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
