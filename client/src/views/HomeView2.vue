<template>
  <div class="px-6 py-8">
    <div class="flex justify-between container mx-auto">
      <div class="w-full lg:w-8/12">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-700 md:text-2xl">
            Post({{ paginationOfPosts.total }})
          </h1>
          <PostFilter @selectSort="emitSelectSort"></PostFilter>
        </div>
        <div class="mt-6" v-for="post in posts" :key="post.id">
          <Post :post="post"></Post>
        </div>
        <!-- pagination -->
        <div class="mt-8" v-if="paginationOfPosts.total_pages != 0">
          <ul class="flex">
            <li
              @click="
                paginationOfPosts.current_page != 1 &&
                  setPostPage(paginationOfPosts.current_page - 1)
              "
              :class="{
                hover_pagi: paginationOfPosts.current_page != 1,
              }"
              class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer"
            >
              <span class="flex items-center font-bold">previous</span>
            </li>
            <li
              v-for="n in paginationOfPosts.total_pages"
              @click="setPostPage(n)"
              :key="n"
              :class="{ active: paginationOfPosts.current_page == n }"
              class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg cursor-pointer"
            >
              <span class="font-bold">{{ n }}</span>
            </li>
            <li
              @click="
                paginationOfPosts.current_page !=
                  paginationOfPosts.total_pages &&
                  setPostPage(paginationOfPosts.current_page + 1)
              "
              :class="{
                hover_pagi:
                  paginationOfPosts.current_page !=
                  paginationOfPosts.total_pages,
              }"
              class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer"
            >
              <span class="flex items-center font-bold">Next</span>
            </li>
          </ul>
        </div>
        <div v-else class="flex flex-col items-center mt-10">
          <i class="fa-solid fa-magnifying-glass fa-2xl"></i>
          <p class="mt-4">
            We couldn't find anything for
            <span class="font-medium">{{ search }}</span>
          </p>
        </div>
      </div>
      <div class="-mx-8 w-4/12 hidden lg:block">
        <div class="px-8">
          <h1 class="mb-4 text-xl font-bold text-gray-700">
            <router-link :to="{ name: 'users' }">Authors</router-link>
          </h1>
          <UsersList></UsersList>
        </div>
        <div class="mt-10 px-8">
          <h1 class="mb-4 text-xl font-bold text-gray-700">
            <router-link :to="{ name: 'tags' }">Tags</router-link>
          </h1>
          <Categories></Categories>
        </div>
        <div class="mt-10 px-8">
          <h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
          <RecentPost></RecentPost>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostFilter from "../components/postComponents/elements-select-option.vue";
import Post from "../components/postComponents/elements-blog-post-article-review.vue";
import UsersList from "../components/postComponents/sections-blog-users-list.vue";
import Categories from "../components/postComponents/sections-categories-list.vue";
import RecentPost from "../components/postComponents/sections-recent-article.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";

const store = useStore();
const router = useRouter();
const page = ref(1);
const search = computed(() => store.getters["search/getSearchText"]);
const posts = computed(() => store.getters["posts/getAllPosts"]);

const paginationOfPosts = computed(
  () => store.getters["posts/getPaginationPost"]
);
const sort = ref("latest");
watch(search, async () => {
  page.value = 1;
  await store.dispatch("posts/setCurrent_page", {
    search: search.value,
    current_page: page.value,
    search: search.value,
  });
});
async function emitSelectSort(select) {
  sort.value = select;
  page.value = 1;
  await store.dispatch("posts/setCurrent_page", {
    sort: sort.value,
    search: search.value,
    limit: 7,
    current_page: page.value,
  });
}

async function setPostPage(page) {
  await store.dispatch("posts/setCurrent_page", {
    sort: sort.value,
    search: search.value,
    limit: 7,
    current_page: page,
  });
}
</script>

<style scoped>
@import "../assets/css/app.css";

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}

.active {
  background-color: rgb(55 65 81 / 1);
  color: rgb(229 231 235 / 1);
}
.hover_pagi {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.hover_pagi:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity));
  color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>
