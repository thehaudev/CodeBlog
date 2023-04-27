<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { instance, instanceWithAccess } from "../configs/axios";
import { URL_IMG } from "../constants";
const emit = defineEmits(["sendImage"]);
const store = useStore();
const images = computed(() => store.getters["auth/getUserImages"]);
const image = ref(false);
const imageSrc = ref("");
const isDisplay = ref(false);
const fileInput = ref("");
async function handleFileInputChange(e) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  await instanceWithAccess
    .post("/images/uploads", formData)
    .then((res) => {
      imageSrc.value = res.data.data.name;
    })
    .catch((err) => {
      console.error("Error:", err);
    });
  isDisplay.value = false;
  image.value = true;
  emit("sendImage", { image: imageSrc.value });
}

function submitImageFunc(src) {
  imageSrc.value = src;
  isDisplay.value = false;
  image.value = true;
  emit("sendImage", { image: imageSrc.value });
}
async function fetchData() {
  await store.dispatch("auth/setUserImages");
}
onMounted(fetchData);
</script>
<template>
  <div
    @click="isDisplay = true"
    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  >
    <div
      v-if="!image"
      class="flex flex-col items-center justify-center pt-5 pb-6"
    >
      <svg
        aria-hidden="true"
        class="w-10 h-10 mb-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        ></path>
      </svg>
      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span class="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </p>
    </div>
    <img v-else :src="URL_IMG + imageSrc" class="object-cover h-64" alt="#" />
  </div>
  <div v-if="isDisplay" class="modal">
    <div class="body">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-2xl dark:text-white"
      >
        Ảnh đã tải lên từ các bài viết trước.
      </h1>
      <div class="list-images">
        <img
          class="images"
          v-for="img in images"
          :key="img._id"
          :src="URL_IMG + img.name"
          @click="submitImageFunc(img.name)"
          alt="#"
        />
      </div>
      <label
        for="dropzone-file"
        class="flex flex-col items-center m-auto mt-5 justify-center w-72 h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileInputChange"
        />
      </label>

      <button class="close-btn" @click="isDisplay = false">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
/* Modal */

.modal {
  position: fixed;
  inset: 0;
  display: flex;
}

.modal .body {
  height: 70%;
  position: relative;
  margin: auto;
  width: 50%;
  background-color: #f9fafb;
  border: 0.5px solid #e3e5e7;
}
.body .list-images {
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 10px;
  padding: 10px;
}
.images {
  cursor: pointer;
  margin: 10px;
  width: 30%;
  object-fit: contain;
}

.modal .close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #ebebeb;
  cursor: pointer;
}

.modal .close-btn i {
  font-size: 20px;
  color: #666;
  margin: auto;
}
.modal .close-btn:hover {
  background: #fff;
}
</style>
