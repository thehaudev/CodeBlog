<template>
  <main>
    <div class="container title">
      <h2>Title</h2>
      <span>Tiêu đề của bài viết.</span>
      <input
        v-model="title"
        type="text"
        placeholder="ex: cách hoạt động của express..."
      />
    </div>
    <div class="container tags">
      <h2>Tags</h2>
      <span
        >Thêm tối đa 5 thẻ để mô tả nội dung bài viết của bạn. Bắt đầu nhập để
        xem gợi ý.</span
      >
      <div class="input">
        <input
          v-model="search"
          type="text"
          placeholder="Ít nhất 1 thẻ tối đa 5 thẻ"
        />
        <div v-if="isPending" class="icon-container">
          <i class="loader"></i>
        </div>
      </div>
      <ul class="sub-menu">
        <li v-for="tag in listTags" :key="tag._id" @click="addTag(tag._id)">
          {{ tag.title }}
        </li>
      </ul>
    </div>
    <div class="container content">
      <EditorMarkdown v-model:content="content"></EditorMarkdown>
    </div>
    <div>
      {{ error }}
    </div>
    <div @click="post" class="container submit">
      <button>Post</button>
    </div>
  </main>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import EditorMarkdown from "../components/EditorMarkdown.vue";
import { usePost } from "../composables/post";
const { error, isPending, createPost } = usePost();
const router = useRouter();
const search = ref("");
const store = useStore();
const tags = ref([]);
const title = ref("");
const content = ref("");
(async function () {
  isPending.value = true;
  await store.dispatch("tags/fetchData");
  isPending.value = false;
})();
const listTags = computed(() =>
  store.getters["tags/getAllTags"].filter(
    (item) => !tags.value.includes(item._id)
  )
);
function addTag(tagId) {
  tags.value.push(tagId);
}
async function post() {
  await createPost(title.value, content.value, tags.value);
  await store.dispatch("posts/fetchData");
  router.push({ name: "home", params: {} });
}
</script>
<style scoped>
main {
  width: 60%;
  height: 95%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.container {
  display: flex;
  flex-direction: column;
  border: 0.5px solid #e3e5e7;
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px 25px;
  background-color: #fff;
}
.container.submit {
  flex: 0.1;
  width: 10%;
  text-align: center;
  margin: 10px 0 0 0;
  background-color: #0a95ff;
  color: #fff;
  align-self: normal;
  margin: 10px 0 0 100px;
  cursor: pointer;
}

.container.content {
  padding: 0;
  border: none;
}
.container h2 {
  font-size: 24px;
}
.container span {
  font-size: 14px;
  color: #555555;
}
.container input {
  border: 0.5px solid #e3e5e7;
  margin: 10px 0 0 0;
  height: 35px;
  padding: 0 15px;
}
.container .input {
  width: 100%;
  padding: 0 0 0 0;
}
.container .input input {
  border: 0.5px solid #e3e5e7;
  margin: 10px 0 0 0;
  height: 35px;
  padding: 0 15px;
  width: 100%;
}
.title {
  width: 90%;
  flex: 0.6;
}
.content {
  width: 90%;
  flex: 5;
}
.tags {
  width: 90%;
  flex: 0.6;
}
.tags .input {
  position: relative;
}
.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 5px);
}
.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #333 #333 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}

.sub-menu {
  border: 1px solid gray;
}
.sub-menu li {
  cursor: pointer;
}
</style>
