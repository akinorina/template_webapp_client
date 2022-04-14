<script setup>
import { reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useImageStore } from "@/stores/ImageStore";

// components
import Breadcrumb from '@/components/Breadcrumb.vue'

// store
const imageStore = useImageStore();

// router & route
const router = useRouter();
const route = useRoute();

// パン屑リスト
const breadcrumbData = [
  { link_data: { name: 'managements-index' }, label: '管理' },
  { link_data: { name: 'managements-images-index' }, label: '画像' },
  { link_data: null, label: '編集' }
]
// target image id.
let imageId = 0
// 対象エリア element
let uploadArea = null
// Input File element
let inputFiles = null
// 画像表示 element
let editElement = null
// let detailImage = null
// 画像 編集用データ
let data = reactive({
  editImage: {
    id: 0,
    userId: '',
    fileName: '',
    fileMimetype: '',
    fileContent: '',
    filePath: '',
    fileUrl: ''
  }
})

// lifecycle hooks
onMounted(() => {
  // target image id.
  imageId = route.params.id

  // access to server.
  imageStore.accessGetImage({ imageId: imageId })
  data.editImage = image

  // 対象エリア element
  uploadArea = document.getElementById('uploadArea')
  // Input File element
  inputFiles = document.getElementById('images')
  // 画像表示 element
  editElement = document.getElementById('image__image__image')
  editElement.addEventListener('load', () => {
  })
})

// data: image
const image = computed(() => {
  return imageStore.image
})

// method:
const fileDragover = (event) => {
  // 背景色設定
  event.target.classList.remove('dropped')
  event.target.classList.add('drag')
}

// method:
const fileDragleave = (event) => {
  // 背景色リセット
  event.target.classList.remove('drag')
}

// 画像読込、表示
const reader = new FileReader()
reader.addEventListener('load', () => {
  //
  const contents = reader.result.match(/^data:(.*);base64,(.*)$/)
  data.editImage.fileName = inputFiles.files[0].name
  data.editImage.fileContent = contents[2]
  data.editImage.fileMimetype = contents[1]
  editElement.src = reader.result
});

// method:
const fileDrop = (event) => {
  // 背景色リセット
  event.target.classList.remove('drag')
  event.target.classList.add('dropped')
  // drag したファイルを設定
  inputFiles.files = event.dataTransfer.files
  // ファイルURL読込
  reader.readAsDataURL(inputFiles.files[0])
}

// method:
const changeFile = (event) => {
  // ファイルURL読込
  reader.readAsDataURL(inputFiles.files[0]);
};

// method: 保存
const submit = (event) => {
  // 送信用データ作成
  const sendImage = {
    id: data.editImage.id,
    file_name: data.editImage.fileName,
    file_mimetype: data.editImage.fileMimetype,
    file_content: data.editImage.fileContent
  }
  // console.log('sendImage', sendImage);

  if (sendImage.file_content == undefined) {
    alert('上書きする画像を指定してください。');
    return;
  }

  // DB保存
  imageStore.accessUpdateImage({ image: sendImage }).then(() => {
    // 詳細ページへ遷移
    router.push({
      name: 'managements-images-detail',
      params: { id: data.editImage.id }
    })
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

    <form @submit.prevent="submit">
      <section class="container">

        <div class="row justify-content-center my-2 image">
          <div class="col-3">
            <label for="image__name__input">画像ID: </label>
          </div>
          <div class="col-3">
            <input
              class="image__name__input"
              id="image__name__input"
              type="text"
              name="filename"
              v-model="data.editImage.id"
            />
          </div>
        </div>
        <div class="row justify-content-center my-2 image">
          <div class="col-3">
            <label for="image__name__input">画像名: </label>
          </div>
          <div class="col-3">
            <input
              class="image__name__input"
              id="image__name__input"
              type="text"
              name="filename"
              v-model="data.editImage.fileName"
            />
          </div>
        </div>
        <div class="row justify-content-center my-2 image">
          <div class="col-3">
            <label for="image__mimetype__input">ファイル mimy タイプ: </label>
          </div>
          <div class="col-3">
            <input
              class="image__mimetype__input"
              id="image__mimetype__input"
              type="text"
              name="fileMimetype"
              v-model="data.editImage.fileMimetype"
            />
          </div>
        </div>
        <div class="d-none row justify-content-center my-2 image">
          <div class="col-3">
            <label for="image__fileContent__input">ファイル データ (base64): </label>
          </div>
          <div class="col-3">
            <input
              class="image__fileContent__input"
              id="image__fileContent__input"
              type="text"
              name="name"
              v-model="data.editImage.fileContent"
            />
          </div>
        </div>
        <div class="row justify-content-center my-2 image">
          <div class="col-6 image__image">
            <img
              class="image__image__image"
              id="image__image__image"
              :src="data.editImage.fileUrl"
            />
          </div>
        </div>
        <div class="row justify-content-center my-2 image">
          <div
            class="col-6 image__upload drag-area"
            id="uploadArea"
            @dragover.prevent="fileDragover"
            @dragleave.prevent="fileDragleave"
            @drop.prevent="fileDrop"
          >
            <input
              type="file"
              id="images"
              name="images"
              accept="image/png, image/jpeg"
              style="width: 310px;"
              @change="changeFile"
            />
          </div>
        </div>
      </section>

      <section class="container">
        <div class="row justify-content-center my-2">
          <div class="col-6 border text-center p-2">
            <button
              type="button"
              class="btn btn-secondary"
              @click="router.push({ name: 'managements-images-detail', params: { id: image.id } })"
            >
              戻る
            </button>
            &nbsp;
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </div>
      </section>
    </form>

  </div>
</template>

<style lang="scss" scoped>

.image {
  margin: 0 auto;
  border: 0px blue solid;

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
      width: fit-content;
      height: fit-content;
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

.drag-area{
  text-align: center;
}
.drag-area.drag{
  background: #f08080;
}
.drag-area.dropped{
  background: #f0c0c0;
}

.drag-area input {
   margin:0 auto;
}

</style>
