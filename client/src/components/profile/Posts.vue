<script setup>
import Post from "../postComponents/elements-blog-post-article-review.vue";

import PostFilter from "../postComponents/elements-select-option.vue";
import NewPostBtn from "../NewPostBtn.vue";
import skeletonLoader from "../skeletonLoader.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";

const store = useStore();
const route = useRoute();

const userId = route.params.id;

const page = ref(1);
const posts = computed(() => store.getters["posts/getPostsOfUser"]);
const user = computed(() => store.getters["auth/getUser"]);

const paginationOfPosts = computed(
  () => store.getters["posts/paginationPostsOfUser"]
);
const sort = ref("latest");
const limit = ref(10);
const search = ref("");

watch(search, async () => {
  page.value = 1;
  await store.dispatch("posts/setPostsOfUser", {
    id: userId,
    search: search.value,
    current_page: page.value,
    sort: sort.value,
    limit: 10,
  });
});
async function emitSelectSort(select) {
  sort.value = select;
  page.value = 1;
  await store.dispatch("posts/setPostsOfUser", {
    id: userId,
    sort: sort.value,
    search: search.value,
    limit: limit.value,
  });
}
watch(search, async () => {
  page.value = 1;
  await store.dispatch("posts/setPostsOfUser", {
    id: userId,
    sort: sort.value,
    search: search.value,
    limit: limit.value,
  });
});
watch(limit, async () => {
  await store.dispatch("posts/setPostsOfUser", {
    id: userId,
    sort: sort.value,
    search: search.value,
    limit: limit.value,
  });
});

window.addEventListener("scroll", (e) => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (
    scrollHeight <= scrollTop + clientHeight &&
    paginationOfPosts.value.total > limit.value
  ) {
    if (paginationOfPosts.value.total - limit.value < 5)
      limit.value += paginationOfPosts.value.total - limit.value;
    else limit.value += 5;
  }
});

async function fetchData() {
  await store.dispatch("posts/setPostsOfUser", {
    id: userId,
    limit: 10,
    sort: sort.value,
    search: search.value,
    current_page: 1,
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (user.value && user.value._id == userId) {
    await store.dispatch("posts/setBookmarkPostsOfUser", {
      id: userId,
      limit: 10,
    });

    await store.dispatch("posts/setPostsInTrashOfUser", {
      id: userId,
      limit: limit.value,
    });
  }
}
onMounted(fetchData);
</script>
<template>
  <div v-if="posts && paginationOfPosts">
    <div class="flex justify-between">
      <fieldset class="space-y-1 text-gray-800 w-1/2">
        <label for="Search" class="hidden">Search</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="search"
              class="p-1 focus:outline-none focus:ring"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                class="w-4 h-4 text-gray-800"
              >
                <path
                  d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            v-model="search"
            type="search"
            name="Search"
            placeholder="Find a post..."
            class="w-full py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-sky-600"
          />
        </div>
      </fieldset>
      <div class="flex justify-end w-1/2 h-9">
        <PostFilter @selectSort="emitSelectSort" class="h-9"></PostFilter>
        <NewPostBtn v-if="user && user._id == userId" class="h-9"></NewPostBtn>
      </div>
    </div>
    <div v-if="paginationOfPosts.total != 0">
      <Post
        class="my-2"
        v-for="post in posts"
        :key="post._id"
        :post="post"
        :typePost="{ type: 'postOfUser' }"
      ></Post>
    </div>

    <div v-else class="flex flex-col items-center mt-10">
      <i class="fa-solid fa-magnifying-glass fa-2xl"></i>
      <p class="mt-4">
        We couldn't find anything for
        <span class="font-medium">{{ search }}</span>
      </p>
    </div>
  </div>
  <skeletonLoader v-else></skeletonLoader>
</template>
