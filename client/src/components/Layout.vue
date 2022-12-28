<template>
  <NavComp />
  <div class="ctn" :style="style">
    <PostModal />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { StyleValue } from "vue"
  import NavComp from "./Nav.vue"
  import PostModal from "./PostModal.vue"

  const { top } = defineProps<{
    top?: string
    style: StyleValue
  }>()
  const padding = 68 + (top ? Number.parseInt(top) : 0) + "px"

</script>

<style scoped>
  .ctn {
    background: #f2f2f2;
    width: 100%;
    min-height: calc(100vh - v-bind("padding"));
    padding-top: v-bind("padding");
    display: flex;
    padding-bottom: 40px;
  }
</style>
