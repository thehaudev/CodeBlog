<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore();
const active = ref("posts");
const route = useRoute();

const userId = route.params.id;
const userLogin = computed(() => store.getters["auth/getUser"]);

const emit = defineEmits(["selectTab"]);
const paginationOfPosts = computed(
  () => store.getters["posts/paginationPostsOfUser"]
);
const paginationOfBookmarkPosts = computed(
  () => store.getters["posts/paginationBookmarkPostsOfUser"]
);
const paginationPostsInTrash = computed(
  () => store.getters["posts/paginationPostsInTrashOfUser"]
);
function selectTab(type) {
  active.value = type;
  emit("selectTab", active.value);
}
</script>
<template>
  <div
    class="flex items-center mb-2 -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center border-solid flex-nowrap text-gray-800"
  >
    <span
      :class="{
        'text-gray-900': active == 'posts',
        'border-sky-600': active == 'posts',
      }"
      rel="noopener noreferrer"
      class="flex items-center mx-1 flex-shrink-0 px-5 py-3 space-x-2 border-b-4 border-solid border-gray-300 text-gray-600"
      @click="selectTab('posts')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span
        >Posts
        <span
          class="bg-gray-300 text-xs p-1 ml-1 rounded-xl"
          v-if="paginationOfPosts"
          >{{ paginationOfPosts.total }}</span
        ></span
      >
    </span>
    <span
      v-if="userLogin && userId == userLogin._id"
      :class="{
        'text-gray-900': active == 'bookmarks',
        'border-sky-600': active == 'bookmarks',
      }"
      rel="noopener noreferrer"
      class="flex items-center mx-1 flex-shrink-0 px-5 py-3 space-x-2 border-b-4 border-solid border-gray-300 text-gray-600"
      @click="selectTab('bookmarks')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span
        >Bookmarks
        <span
          class="bg-gray-300 text-xs p-1 ml-1 rounded-xl"
          v-if="paginationOfBookmarkPosts"
          >{{ paginationOfBookmarkPosts.total }}</span
        ></span
      >
    </span>
    <span
      v-if="userLogin && userId == userLogin._id"
      :class="{
        'text-gray-900': active == 'trash',
        'border-sky-600': active == 'trash',
      }"
      rel="noopener noreferrer"
      class="flex items-center mx-1 flex-shrink-0 px-5 py-3 space-x-2 border-b-4 border-solid border-gray-300 text-gray-600"
      @click="selectTab('trash')"
    >
      <i class="fa-solid fa-trash-can"></i>
      <span
        >Trash
        <span
          v-if="paginationPostsInTrash"
          class="bg-gray-300 text-xs p-1 ml-1 rounded-xl"
          >{{ paginationPostsInTrash.total }}</span
        ></span
      >
    </span>
  </div>
</template>
