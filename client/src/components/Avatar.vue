<template>
  <img
    :src="photo || 'https://osu.ppy.sh/images/layout/avatar-guest@2x.png'"
    :alt="alt"
  />
</template>

<script setup lang="ts">
  import { ref } from "vue"

  const { photo, userId } = defineProps<{
    photo?: string | null
    userId: number | "user"
    size?: string
  }>()
  const alt = ref("userId" + userId)
  const src = ref(photo)

  if (userId === "user") {
    // Obteniendo a user del local storage
    const userRaw = <string>localStorage.getItem("user")
    src.value = JSON.parse(userRaw).avata
    alt.value = "user"
  }
</script>

<style scoped>
  img {
    width: v-bind("size ?? '40px'");
    height: v-bind("size ?? '40px'");
    border-radius: 8px;
  }
</style>
