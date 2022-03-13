<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <section class="py-2 text-center container">
      <div class="row py-lg-5 border border-3 rounded">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <p class="lead text-muted">管理画面</p>
        </div>
      </div>
    </section>

    <div class="container">
    </div>

    <div class="container">
      <router-link :to="{ name: 'index' }">top pageへ</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>>
