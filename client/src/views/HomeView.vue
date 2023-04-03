<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { URL_AVATAR } from "../constants/index";
import { getTimeSincePost } from "../utils/timeSincePost";
const store = useStore();

const posts = computed(() => store.getters["posts/getAllPosts"]);
</script>

<template>
  <div class="container">
    <nav>
      <ul>
        <li>Posts</li>
        <li>Questions</li>
        <li>Tags</li>
        <li>Users</li>
      </ul>
    </nav>
    <main>
      <div v-for="post in posts" :key="post._id" class="post">
        <div class="avatar">
          <img :src="URL_AVATAR + post.user.avatar" alt="avatar" />
        </div>
        <div class="content">
          <div class="content-header">
            <p class="username">{{ post.user.display_name }}</p>
            -
            <p>about {{ getTimeSincePost(post.createdAt) }} hours ago</p>
          </div>
          <div class="title">
            <h2>
              [Paper Explain] Clustering trong Computer Vision: Hướng đi mới
              thay thế CNN và Transformer?
            </h2>
          </div>
          <ul class="tags">
            <li v-for="tag in post.tags" :key="tag._id">{{ tag.title }}</li>
          </ul>
          <div class="action">
            <div class="views">
              <i class="fa-solid fa-eye"></i><span>{{ post.views }}</span>
            </div>
            <div class="bookmarks">
              <i class="fa-solid fa-bookmark"></i
              ><span>{{ post.bookmarks }}</span>
            </div>
            <div class="comments">
              <i class="fa-solid fa-comments"></i
              ><span>{{ post.comments }}</span>
            </div>
            <div class="vote">
              <i class="fa-solid fa-thumbs-up"></i><span>{{ post.votes }}</span>
            </div>
          </div>
        </div>
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
