<script setup>
import { getTimeSincePost, getReadableDate } from "../../utils/time";
import { URL_AVATAR } from "../../constants/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

const store = useStore();
const router = useRouter();
const props = defineProps(["post"]);
const readMore = ref(false);

async function getPostDetail(postId) {
  await store.dispatch("postDetail/fetchData", { postId: postId });
  router.push({ name: "postDetail", params: { id: postId } });
}

function hiddenContent() {
  const element = document.getElementById(props.post._id);
  element.scrollIntoView();
  setTimeout(() => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 100;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, 10);
  readMore.value = false;
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <div class="max-w-5xl px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">
        {{ getReadableDate(post.createdAt) }}</span
      >
      <div>
        <router-link
          v-for="tag in post.tags"
          :key="tag.id"
          class="px-2 py-1 mx-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          :to="{
            name: 'postsTagged',
            params: {
              id: tag._id,
            },
          }"
          >{{ tag.title }}</router-link
        >
      </div>
    </div>
    <div class="mt-2">
      <span
        @click="getPostDetail(post._id)"
        :id="post._id"
        class="text-2xl text-gray-700 font-bold hover:underline cursor-pointer"
        >{{ post.title }}</span
      >
      <div
        class="mt-2 text-gray-600"
        :class="{ paragraph: !readMore }"
        v-html="post.content"
      ></div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <span
        v-if="!readMore"
        @click="readMore = true"
        class="text-blue-500 hover:underline cursor-pointer"
        >Read more</span
      >
      <span
        v-else
        @click="hiddenContent"
        class="text-blue-500 hover:underline cursor-pointer"
        >Hidden content</span
      >
    </div>
    <div class="flex justify-between items-center">
      <div class="flex mt-2">
        <div class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded">
          {{ post.votes }}<span class="hidden md:inline">&nbsp;votes</span>
        </div>
        <div
          class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded cursor-pointer hover:bg-gray-100 hover:text-black"
        >
          <router-link
            :to="{
              name: 'postDetail',
              params: { id: post._id },
              query: {
                commentId: 'Discussion',
              },
            }"
            >{{ post.comments
            }}<span class="hidden md:inline">&nbsp;comments</span></router-link
          >
        </div>
        <div class="py-1 pl-1 pr-2 text-gray-600 text-sm rounded">
          {{ post.views }}<span class="hidden md:inline">&nbsp;views</span>
        </div>
      </div>
      <div>
        <router-link
          :to="{
            name: 'profile',
            params: {
              id: post.user._id,
            },
          }"
          class="flex items-center"
          href="#"
        >
          <img
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            :src="URL_AVATAR + post.user.avatar"
            :alt="post.display_name"
          />
          <h1 class="text-gray-700 font-bold hover:underline">
            {{ post.user.display_name }}
          </h1>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
