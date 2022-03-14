<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>

  <div>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <p class="lead text-muted">samples/page002</p>
        </div>
      </div>
    </section>

    <nav class="container">
      <router-link :to="{ name: 'index' }">index</router-link>
      <router-link :to="{ name: 'samples-index' }">samples/index</router-link>
      <router-link :to="{ name: 'samples-page001' }">samples/page001</router-link>
      <router-link :to="{ name: 'samples-page002' }">samples/page002</router-link>
    </nav>

  </div>

</template>

<style lang="scss" scoped>

nav {
  a {
    border-left: 1px #e0e0e0 solid;
    padding: 0 10px;
  }
  a:first-child {
    border-left: 0px;
    padding: 0 10px;
  }
}

</style>>
