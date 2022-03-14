<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">template_webapp</h1>
          <p class="lead text-muted">samples/index</p>
        </div>
      </div>
    </section>

    <!-- Bootstrap code -->
    <!-- Button trigger modal -->
    <section class="text-center container">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
    </section>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //Bootstrap code -->

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
