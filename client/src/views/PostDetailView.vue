<script setup>
import { Comment } from "../components/Comment.vue";
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// import { usePost } from "../composables/post";
import { URL_AVATAR } from "../constants/index";
import { getTimeSincePost } from "../utils/timeSincePost";

const store = useStore();
const route = useRoute();
const postId = computed(() => route.params.id);
const post = computed(() => store.getters["postDetail/getPost"]);
const fetchData = async () => {
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
};

onMounted(fetchData);
</script>

<template>
  <div class="container">
    <main>
      <div v-if="post" class="post">
        <div class="avatar">
          <img :src="URL_AVATAR + post.user.avatar" alt="avatar" />
        </div>
        <div class="content">
          <div class="content-header">
            <p class="username">{{ post.user.display_name }}</p>
            -
            <p>about {{ getTimeSincePost(post.createdAt) }}</p>
          </div>
          <div class="title">
            {{ post.title }}
          </div>
          <ul class="tags">
            <li v-for="tag in post.tags" :key="tag._id">{{ tag.title }}</li>
          </ul>
          <section v-html="post.content"></section>
        </div>
        <Comment></Comment>
      </div>
    </main>
  </div>
</template>
<style>
.container {
  display: flex;
  justify-content: center;
  margin: 0 20%;
}
nav {
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  flex: 1;
}
main {
  flex: 5;
}
main .post {
  width: 100%;
  min-height: 160px;
  display: flex;
  justify-content: flex-start;
}
.post .avatar {
  /* Center the content */
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  /* Size */
  width: 40px;
}
.post .avatar img {
  width: 100%;
  border-radius: 50%;
}
.post .title {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}
.post .title:hover {
  color: blue;
}
.content-header {
  display: flex;
  justify-content: flex-start;
}
.tags {
  display: flex;
  justify-content: flex-start;
}
.tags > li {
  padding: 3px 10px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0 2px;
}
.action {
  display: flex;
  justify-content: flex-start;
}
</style>
