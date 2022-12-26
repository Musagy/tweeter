<template>
  <button
    @focus="() => toggleHandler(true)"
    @blur="() => toggleHandler(false)"
    type="button"
  >
    <template v-if="isPublic">
      <span class="material-symbols-outlined"> public </span> Todos pueden
      responderlo
    </template>
    <template v-else>
      <span class="material-symbols-outlined"> group </span> Solo los que sigues
    </template>
  </button>
  <Transition>
    <div class="privacies-type" v-if="togglePrivacyConf">
      <h3>¿Quién puede responder?</h3>
      <p>Elige quién puede responder a este Tweet.</p>
      <button @click="() => (isPublic = true)" type="button">
        <span class="material-symbols-outlined"> public </span> Todo el mundo
      </button>
      <button @click="() => (isPublic = false)" type="button">
        <span class="material-symbols-outlined"> group </span> Las personas que
        sigues
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue"

  const togglePrivacyConf = ref(false)
  const toggleHandler = (value: boolean) => (togglePrivacyConf.value = value)

  const isPublic = ref(true)

  const emit = defineEmits<{
    (e: "setPublic", value: boolean): void
  }>()

  watch(
    computed(() => isPublic.value),
    () => emit("setPublic", isPublic.value)
  )
</script>

<style scoped>
  .privacies-type {
    background: #ffffff;
    padding: 12px;
    display: flex;
    flex-direction: column;
    width: 210px;
    gap: 3px;

    border-radius: 12px;
    box-shadow: 0px 2px 4px 0px #0000000d;
    border: 1px solid #e0e0e0;

    position: relative;
    top: 20px;
  }
  .privacies-type h3 {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 600;
    color: #4f4f4f;
  }
  .privacies-type p {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 400;
    color: #828282;
    margin-bottom: 2px;
  }
  .privacies-type button {
    font-family: Noto Sans;
    font-size: 12px;
    font-weight: 500;
    padding: 12px;
    color: #4f4f4f;
    height: 40px;
  }
  /* we will explain what these classes do next! */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(-2px);
  }
</style>
