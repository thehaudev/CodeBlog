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
    await store.dispatch("route/setRouteBeforeLogin", {
      route: route.name,
    });
    router.push({ name: "login", params: {} });
  }
}

onMounted(fetchData);
</script>
<template>
  <main>
    <h1>Tags</h1>
    <p>
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
    <ul v-if="paginationOfTags" class="pagination">
      <li href="#">&laquo;</li>
      <li
        v-for="n in paginationOfTags.total_pages || 1"
        @click="setTagPage(n)"
        :key="n"
        :class="{ active: paginationOfTags.current_page == n }"
        href="#"
      >
        {{ n }}
      </li>
      <li href="#">&raquo;</li>
    </ul>
  </main>
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
.pagination li {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
}

.pagination li.active {
  background-color: #4caf50;
  color: white;
}
</style>
