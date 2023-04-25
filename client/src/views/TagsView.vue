<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = useStore();
const search = ref("");
const page = ref(1);
const listTags = computed(() => store.getters["tags/getAllTags"]);
const paginationOfTags = computed(() => store.getters["tags/getPagination"]);
const user = computed(() => store.getters["auth/getUser"]);
const tagsFollowing = computed(
  () => (user.value && store.getters["auth/getTagsFollowing"]) || []
);
function checkFollowTag(id) {
  return tagsFollowing.value.some((e) => e.tagId == id);
}
async function fetchData() {
  if (user.value) await store.dispatch("auth/setTagsFollowing");
  await store.dispatch("tags/filterTag", {
    current_page: page.value,
    search: search.value,
  });
}
async function setTagPage(pageTag) {
  page.value = pageTag;
  await store.dispatch("tags/filterTag", {
    current_page: page.value,
    search: search.value,
  });
}
watch(search, async () => {
  page.value = 1;
  await store.dispatch("tags/filterTag", {
    current_page: page.value,
    search: search.value,
  });
});

async function followTag(tagId) {
  if (user.value) {
    await store.dispatch("tags/follow", { tagId: tagId });
    await store.dispatch("auth/setTagsFollowing");
    await store.dispatch("tags/filterTag", {
      current_page: page.value,
      search: search.value,
    });
  } else {
    await store.dispatch("route/setShowModalLogin", {
      isShow: true,
    });
  }
}

onMounted(fetchData);
</script>
<template>
  <div class="w-full lg:w-8/12" v-if="listTags && paginationOfTags">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-700 md:text-2xl">
        Tags({{ paginationOfTags.total }})
      </h1>
    </div>
    <p class="mt-1">
      Tag là từ khóa hoặc nhãn phân loại câu hỏi, bài viết của bạn với các câu
      hỏi, bài viết tương tự khác. Sử dụng đúng thẻ giúp người khác tìm và trả
      lời câu hỏi, bài viết của bạn dễ dàng hơn.
    </p>
    <input
      v-model="search"
      type="search"
      placeholder="Filter by tag name"
      class="py-2 px-4"
    />
    <section class="tag-layout">
      <div v-for="tag in listTags" :key="tag._id" class="item">
        <p>
          <i class="fa-solid fa-square-rss mr-2" style="color: #fe9e40"></i
          >{{ tag.title }}
        </p>
        <ul>
          <li>{{ tag.posts }} posts</li>
          <li>{{ tag.follows }} follow</li>
        </ul>
        <button
          v-if="checkFollowTag(tag._id)"
          style="color: #fff; background-color: #5488c7"
          @click="followTag(tag._id)"
        >
          Following
        </button>
        <button v-else @click="followTag(tag._id)">+ Follow</button>
      </div>
    </section>
    <!-- pagination -->
    <div class="mt-8" v-if="paginationOfTags.total_pages != 0">
      <ul class="flex">
        <li
          @click="
            paginationOfTags.current_page != 1 &&
              setTagPage(paginationOfTags.current_page - 1)
          "
          :class="{
            hover_pagi: paginationOfTags.current_page != 1,
          }"
          class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer"
        >
          <span class="flex items-center font-bold">previous</span>
        </li>
        <li
          v-for="n in paginationOfTags.total_pages"
          @click="setTagPage(n)"
          :key="n"
          :class="{ active: paginationOfTags.current_page == n }"
          class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg cursor-pointer"
        >
          <span class="font-bold">{{ n }}</span>
        </li>
        <li
          @click="
            paginationOfTags.current_page != paginationOfTags.total_pages &&
              setTagPage(paginationOfTags.current_page + 1)
          "
          :class="{
            hover_pagi:
              paginationOfTags.current_page != paginationOfTags.total_pages,
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
</template>
<style scoped>
.tag-layout {
  --columns: 4;
  --spacing: 20px;

  display: flex;
  flex-wrap: wrap;
  margin-left: calc(-1 * var(--spacing));
  padding: 32px 0;
  background-color: #fff;
}

.tag-layout .item {
  width: calc(100% / var(--columns) - var(--spacing));
  height: 90px;
  margin-left: var(--spacing);
  margin-top: var(--spacing);
  font-size: 1rem;
  font-weight: 600;
}
.item button {
  border: 2px solid #5488c7;
  color: #5488c7;
  border-radius: 5px;
  padding: 3px 15px;
}
.item button:hover {
  background-color: #5488c7;
  color: #fff;
}
.followed {
  background-color: #5488c7;
  color: #fff;
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
