<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

import { useRoute } from "vue-router";
import HidePostModal from "../modal/HidePostModal.vue";
import BookmarkLi from "./BookmarkLi.vue";
import DeletePostModal from "../modal/DeletePostModal.vue";

const props = defineProps(["type", "postId", "authorId"]);
const store = useStore();
const isShow = ref(false);

const isShowHidePostModal = ref(false);
const isShowDeletePostModal = ref(false);

const route = useRoute();
const userId = route.params.id;
const user = computed(() => store.getters["auth/getUser"]);
function closeModal() {
  if (!event.target.closest(".modal")) {
    isShow.value = false;
  }
}

async function restorePost() {
  await store.dispatch("posts/editStatusOfPost", {
    postId: props.postId,
    status: true,
  });
  await store.dispatch("posts/setPostsOfUser", {
    id: userId,
    limit: 7,
  });

  if (user.value._id == userId) {
    await store.dispatch("posts/setPostsInTrashOfUser", {
      id: userId,
      limit: 7,
    });
  }
}
</script>
<template>
  <div
    class="absolute right-0 top-4"
    @mouseover="isShow = true"
    @mouseleave="isShow = false"
  >
    <button
      class="absolute right-0 top-0 inline-flex p-2 text-sm font-medium text-center text-gray-300 bg-white rounded-lg hover:bg-gray-100 dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <svg
        class="w-6 h-6"
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
      class="relative right-3 top-7 z-10 bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 dark:divide-gray-600 shadow-md"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <BookmarkLi
          :postId="postId"
          v-if="type.type == 'postOfUser' || type.type == 'postHome'"
        >
        </BookmarkLi>
        <BookmarkLi :postId="postId" v-if="type.type == 'bookmarkPost'">
        </BookmarkLi>
        <li>
          <span
            v-if="type.type != 'trash' && user && user._id == authorId"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="isShowHidePostModal = true"
            >Hide posts</span
          >
        </li>

        <li>
          <span
            v-if="type.type == 'trash' && user && user._id == userId"
            @click="restorePost"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Restore from trash
          </span>
        </li>
        <li>
          <span
            v-if="type.type == 'trash' && user && user._id == authorId"
            class="block text-red-400 cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="isShowDeletePostModal = true"
            >Delete</span
          >
        </li>
      </ul>
    </div>
  </div>
  <HidePostModal
    @closeModal="isShowHidePostModal = false"
    :postId="postId"
    v-if="isShowHidePostModal"
  ></HidePostModal>
  <DeletePostModal
    @closeModal="isShowDeletePostModal = false"
    :postId="postId"
    v-if="isShowDeletePostModal"
  ></DeletePostModal>
</template>
