<script setup>
import { useRouter } from 'vue-router'

// router
const router = useRouter()

</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <h2 class="fw-light">Registration</h2>
          <p class="lead text-muted">登録完了</p>
        </div>
      </div>
    </section>

    <div class="container text-center">
      <button class="btn btn-primary" @click="router.push({ name: 'auth-login' })">Loginページへ</button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
</style>>
