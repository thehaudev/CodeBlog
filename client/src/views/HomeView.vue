<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { URL_AVATAR } from "../constants/index";
import { getTimeSincePost } from "../utils/time";
const store = useStore();
const router = useRouter();
async function getPostDetail(postId) {
  await store.dispatch("postDetail/fetchData", { postId: postId });
  router.push({ name: "postDetail", params: { id: postId } });
}
async function setPostPage(page) {
  await store.dispatch("posts/setCurrent_page", {
    current_page: page,
  });
}
const posts = computed(() => {
  return store.getters["posts/getAllPosts"];
});
const paginationOfPosts = computed(
  () => store.getters["posts/getPaginationPost"]
);
</script>

<template>
  <div class="main" v-if="posts">
    <div v-for="post in posts" :key="post._id" class="post flex">
      <div class="avatar mr-2">
        <img :src="URL_AVATAR + post.user.avatar" alt="avatar" />
      </div>
      <div class="content">
        <div class="content-header">
          <p class="username">{{ post.user.display_name }}</p>
          -
          <p>about {{ getTimeSincePost(post.createdAt) }}</p>
        </div>
        <div class="title">
          <h2 @click="getPostDetail(post._id)">
            {{ post.title }}
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
            <i class="fa-solid fa-comments"></i><span>{{ post.comments }}</span>
          </div>
          <div class="vote">
            <i class="fa-solid fa-thumbs-up"></i><span>{{ post.votes }}</span>
          </div>
        </div>
      </div>
    </div>
    <ul v-if="paginationOfPosts" class="pagination">
      <li href="#">&laquo;</li>
      <li
        v-for="n in paginationOfPosts.total_pages"
        @click="setPostPage(n)"
        :key="n"
        :class="{ active: paginationOfPosts.current_page == n }"
        href="#"
      >
        {{ n }}
      </li>
      <li href="#">&raquo;</li>
    </ul>
  </div>
</template>

<style scoped>
.main .post {
  width: 100%;
  min-height: 160px;
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
.pagination {
  margin: 10px auto;
  display: inline-block;
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
