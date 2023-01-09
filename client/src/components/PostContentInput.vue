<template>
  <textarea
    placeholder="¿Qué está pasando?"
    @input="resize()"
    v-model="content"
    ref="textarea"
  />
</template>

<script setup lang="ts">
  import { computed, ref, type Ref, watch } from "vue"

  let textarea = <Ref<HTMLTextAreaElement>>ref()
  const resize = () => {
    textarea.value.style.height = "18px"
    textarea.value.style.height = textarea.value.scrollHeight + "px"
  }

  const content = ref("")

  const emit = defineEmits<{
    (e: "setContent", value: string): void
  }>()

  watch(
    computed(() => content.value),
    () => emit("setContent", content.value)
  )
</script>

<style scoped>
  textarea {
    font-family: Noto Sans;
    font-size: 16px;
    font-weight: 500;

    width: 100%;
    border: none;

    border-radius: 10px;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  textarea::-webkit-scrollbar {
    width: 0;
  }
</style>
