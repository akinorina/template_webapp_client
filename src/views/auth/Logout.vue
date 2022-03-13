<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from "@/stores/AuthStore";

// stores
const authStore = useAuthStore();

// lifecycle hooks
onMounted(() => {
  // access to server.
  authStore.accessLogout()
})

</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp_client</h1>
          <p class="lead text-muted">Logout</p>
        </div>
      </div>
    </section>

    <div class="container">
      <p>ログアウトしました。</p>
      <router-link :to="{ name: 'index' }">Topへ戻る</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>>
