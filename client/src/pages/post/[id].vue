<template>
  <Layout
    top="26"
    :style="{
      justifyContent: 'center',
      gap: '25px',
    }"
  >
    <main>
      <template v-if="exists">
        <Post v-if="post !== null" :post="post" />
        <Loading v-else/>
      </template>
      <template v-else>
        <h2>No existe el post al que quieres acceder</h2>
      </template>
    </main>
  </Layout>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { useRoute } from "vue-router"
  import Layout from "../../components/Layout.vue"
  import Post from "../../components/Post.vue"
  import { Post as PostType } from "../../types/Model"
  import { getPostById } from "../../utils/postQueries"
  import Loading from "../../components/Loading.vue"

  const { params } = useRoute()

  const post = ref<PostType | null>(null)
  const exists = ref<boolean>(true)
  onMounted(async () => {
    const res = await getPostById(+params.id)
    if (res.retweetId !== null)
      return (post.value = await getPostById(res.retweetId))
    post.value = res
  })
</script>

<style scoped>
</style>
