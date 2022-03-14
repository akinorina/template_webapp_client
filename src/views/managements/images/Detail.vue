<script setup>
// import { RouterLink } from "vue-router";
import { computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { useUserStore } from "@/stores/UserStore";
import { useImageStore } from "@/stores/ImageStore";

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const imageStore = useImageStore();

// router
const router = useRouter();
const route = useRoute();

// パン屑リスト
const breadcrumbData = [
  { link_data: { name: "managements-index" }, label: "管理" },
  { link_data: { name: "managements-images-index" }, label: "画像" },
  { link_data: null, label: "詳細" }
]

// target image id.
let imageId = 0;

// lifecycle hooks
onMounted(() => {
  // target image id.
  imageId = route.params.id;
  console.log("-- imageId", imageId);
  // access to server.
  imageStore.accessGetImage({ imageId: imageId });
});

// data: userList
const image = computed(() => {
  return imageStore.image;
});

// method: to [go back to image top] page.
const deleteThis = () => {
  // access to server.
  imageStore.accessDeleteImage({ imageId: imageId }).then(() => {
    router.push({ name: 'managements-images-index' })
  })
}

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

    <section class="container">
      <breadcrumb :links="breadcrumbData"></breadcrumb>
    </section>

    <section class="container">
      <div class="image">
        <div class="image__id">画像ID: {{ image.id }}</div>
        <div class="image__name">画像名: {{ image.fileName }}</div>
        <div class="image__image">
          <img
            class="image__image__image"
            id="image__image__image"
            :src="image.fileUrl"
          />
        </div>
      </div>
    </section>

    <section class="container">
      <div class="container">
        <button
          type="button"
          class="btn btn-secondary"
          @click="router.push({ name: 'managements-images-index' })"
        >
          一覧へ戻る
        </button>
        &nbsp;
        <button
          type="button"
          class="btn btn-primary"
          @click="router.push({ name: 'managements-images-edit', params: { id: image.id } })"
        >
          編集
        </button>
        &nbsp;
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#confirmToDelete"
        >
          削除
        </button>
      </div>
    </section>

    <div
      class="modal fade"
      id="confirmToDelete"
      tabindex="-1"
      aria-labelledby="confirmToDeleteLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmToDeleteLabel">template_webapp</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">削除しますか？</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              キャンセル
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteThis"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//
.image {
  margin: 0 auto;
  border: 0 blue solid;

  &__id {
    width: auto;
    height: auto;
  }

  &__name {
    width: auto;
    height: auto;
  }

  &__image {
    margin: 0 auto;
    width: 350px;
    height: 350px;
    border: 10px #f0f0f0 solid;
    display: flex;
    justify-content: center;

    &__image {
      width: auto;
      height: auto;
      max-width: 350px;
      max-height: 350px;
    }
  }

  &__upload {
    margin: 0 auto;
    padding: 25px 0;
    width: 350px;
    height: 100px;
    border: 10px #f0f0f0 solid;
    background: #f0f0f0;
    display: flex;
  }
}

.drag-area {
  text-align: center;
}
.drag-area.drag {
  background: #f08080;
}

.drag-area input {
  margin: 0 auto;
}
</style>
