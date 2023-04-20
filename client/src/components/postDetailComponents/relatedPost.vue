<script setup>
import skeletonLoader from "../skeletonLoader.vue";
import { computed } from "vue";
import { URL_AVATAR } from "../../constants";
import { getReadableDate } from "../../utils/time";

const props = defineProps(["post"]);
const post = computed(() => props.post);
</script>
<template>
  <div
    v-if="post"
    class="max-w-md p-5 overflow-hidden rounded-lg shadow bg-gray-50 text-gray-800"
  >
    <article>
      <h2 class="text-xl font-bold paragraph">
        {{ post.title }}
      </h2>
      <div
        class="mt-4 text-gray-600 paragraph content"
        v-html="post.content"
      ></div>
      <div class="flex items-center mt-8 space-x-4">
        <img
          :src="URL_AVATAR + post.user[0].avatar"
          alt=""
          class="w-10 h-10 rounded-full bg-gray-500"
        />
        <div>
          <h3 class="text-sm font-medium">
            {{ post.user[0].display_name }}
          </h3>
          <time datetime="2021-02-18" class="text-sm text-gray-600">{{
            getReadableDate(post.createdAt)
          }}</time>
        </div>
      </div>
    </article>
  </div>
  <skeletonLoader v-else></skeletonLoader>
</template>
<style scoped>
.paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.content {
  -webkit-line-clamp: 3;
}
</style>
