<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const active = ref("posts");
const emit = defineEmits(["selectTab"]);
const paginationOfPosts = computed(
  () => store.getters["posts/paginationPostsOfUser"]
);
const paginationOfBookmarkPosts = computed(
  () => store.getters["posts/paginationBookmarkPostsOfUser"]
);
function selectTab(type) {
  active.value = type;
  emit("selectTab", active.value);
}
</script>
<template>
  <div
    class="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center border-solid flex-nowrap text-gray-800"
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

    <!-- <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-600 text-gray-600"
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
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      <span>Excepturi</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-600 text-gray-600"
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
        <circle cx="12" cy="12" r="10"></circle>
        <polygon
          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
        ></polygon>
      </svg>
      <span>Consectetur</span>
    </a> -->
  </div>
</template>
