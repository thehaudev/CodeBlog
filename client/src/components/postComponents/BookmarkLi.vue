<script setup>
import { computed, onMounted } from "vue";
import { useBookmark } from "../../composables/bookmark";
import { useStore } from "vuex";

const store = useStore();
const { bookmark } = useBookmark();
const props = defineProps(["postId"]);
const emit = defineEmits(["bookmarkSubmit"]);
const user = computed(() => store.getters["auth/getUser"]);

const bookmarks = computed(
  () => (user.value && store.getters["auth/getUserBookmarks"]) || []
);
function checkBookmark(id) {
  return bookmarks.value.some((e) => e.postId == id);
}

async function bookmarkBtn() {
  if (user.value) {
    await bookmark(props.postId);
    await store.dispatch("posts/setBookmarkPostsOfUser", {
      id: user.value._id,
    });
    await store.dispatch("auth/setUserBookmarks");
  } else {
    await store.dispatch("route/setShowModalLogin", {
      isShow: true,
    });
  }
}
onMounted(async () => {
  if (user.value) await store.dispatch("auth/setUserBookmarks");
});
</script>
<template>
  <li @click="bookmarkBtn">
    <span
      v-if="!checkBookmark(postId)"
      class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >Bookmark</span
    >
    <span
      v-else
      class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >Unbookmark</span
    >
  </li>
</template>
