<template>
  <div class="max-w-5xl px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">
        {{ getReadableDate(post.createdAt) }}</span
      >
      <div>
        <a
          v-for="tag in post.tags"
          :key="tag.id"
          class="px-2 py-1 mx-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
          >{{ tag.title }}</a
        >
      </div>
    </div>
    <div class="mt-2">
      <span
        @click="getPostDetail(post._id)"
        class="text-2xl text-gray-700 font-bold hover:underline cursor-pointer"
        >{{ post.title }}</span
      >
      <div class="mt-2 text-gray-600 paragraph" v-html="post.content"></div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <span
        @click="getPostDetail(post._id)"
        class="text-blue-500 hover:underline cursor-pointer"
        >Read more</span
      >
      <div>
        <a class="flex items-center" href="#">
          <img
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            :src="URL_AVATAR + post.user.avatar"
            :alt="post.display_name"
          />
          <h1 class="text-gray-700 font-bold hover:underline">
            {{ post.user.display_name }}
          </h1>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getTimeSincePost, getReadableDate } from "../../utils/time";
import { URL_AVATAR } from "../../constants/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const store = useStore();
const router = useRouter();
const props = defineProps(["post"]);

async function getPostDetail(postId) {
  await store.dispatch("postDetail/fetchData", { postId: postId });
  router.push({ name: "postDetail", params: { id: postId } });
}
</script>
<style scoped>
.paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
