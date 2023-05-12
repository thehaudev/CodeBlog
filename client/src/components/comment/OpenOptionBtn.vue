<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

import { useRoute } from "vue-router";
import DeleteCommentModal from "../modal/DeleteCommentModal.vue";

const props = defineProps(["commentId", "authorId"]);
const store = useStore();
const isShow = ref(false);

const isShowHidePostModal = ref(false);

const route = useRoute();
const user = computed(() => store.getters["auth/getUser"]);
</script>
<template>
  <div
    v-if="user && user._id == authorId"
    class="relative"
    @mouseover="isShow = true"
    @mouseleave="isShow = false"
  >
    <button
      class="inline-flex p-2 text-sm font-medium text-center text-gray-300 bg-white rounded-lg hover:bg-gray-100 dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <svg
        class="w-4 h-4"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
        ></path>
      </svg>
    </button>

    <div
      v-if="isShow"
      class="absolute right-3 top-7 z-10 bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 dark:divide-gray-600 shadow-md"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <li @click="isShowHidePostModal = true">
          <span
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Delete
          </span>
        </li>
      </ul>
    </div>
  </div>
  <DeleteCommentModal
    @closeModal="isShowHidePostModal = false"
    :commentId="commentId"
    :limit="limit"
    v-if="isShowHidePostModal"
  ></DeleteCommentModal>
</template>
