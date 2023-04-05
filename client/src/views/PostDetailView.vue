<script setup>
import { computed, reactive, ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
import { getTimeSincePost } from "../utils/timeSincePost";
import CommentComponent from "../components/CommentComponent.vue";
import { useVotePost } from "../composables/votePost";
import { useBookmark } from "../composables/bookmark";
import { useFollow } from "../composables/follow";
const { follow } = useFollow();
const { bookmark } = useBookmark();
const { votePost } = useVotePost();
const store = useStore();
const route = useRoute();
const postId = computed(() => route.params.id);
const post = computed(() => store.getters["postDetail/getPost"]);
const listComments = computed(
  () => store.getters["postDetail/getCommentsInPost"]
);
async function followBtn(followingId) {
  await follow(followingId);
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
}
async function vote(type) {
  await votePost(postId.value, type);
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
}
async function bookmarkBtn() {
  await bookmark(postId.value);
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
}
const fetchData = async () => {
  await store.dispatch("vote/fetchData", { postId: postId.value });
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
};
onMounted(fetchData);
</script>

<template>
  <main v-if="post">
    <div class="post-active">
      <div class="vote">
        <i
          title="Upvote"
          class="fa-solid fa-caret-up"
          @click="vote('Upvote')"
        ></i>
        <span>{{ post.votes }}</span>
        <i
          title="Downvote"
          class="fa-solid fa-caret-down"
          @click="vote('Downvote')"
        ></i>
      </div>
      <div @click="bookmarkBtn()" title="Bookmarks this post" class="bookmark">
        <i v-if="true" class="fa-solid fa-bookmark"></i
        ><i v-else class="fa-regular fa-bookmark"></i>
      </div>
      <div title="Share a link to post on facebook" class="share">
        <i class="fa-brands fa-facebook-f"></i>
      </div>
    </div>
    <div class="container">
      <div class="post">
        <div class="content-header">
          <div class="avatar">
            <img :src="URL_AVATAR + post.user.avatar" alt="avatar" />
          </div>
          <div class="profile">
            <div class="top">
              <div class="user">
                <p class="username">{{ post.user.display_name }}</p>
                <p class="email">@{{ post.user.email.split("@")[0] }}</p>
                <button @click="followBtn(post.user._id)" class="follow">
                  Follow
                </button>
              </div>
              <span>Published Feb 10th, 1:43 p.m. 5 min read</span>
            </div>
            <div class="bottom">
              <p>
                <i class="fa-solid fa-user-plus"></i>
                <span>{{ post.followers }}</span>
              </p>
              <p>
                <i class="fa-solid fa-pencil"></i><span>{{ post.posts }}</span>
              </p>

              <p>
                <i class="fa-regular fa-eye"></i><span>{{ post.views }}</span>
              </p>
              <p>
                <i class="fa-regular fa-comments"></i
                ><span>{{ post.comments }}</span>
              </p>
              <p><i class="fa-solid fa-bookmark"></i>{{ post.bookmarks }}</p>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="title">
            {{ post.title }}
          </div>
          <ul class="tags">
            <li v-for="tag in post.tags" :key="tag._id">{{ tag.title }}</li>
          </ul>
          <section v-html="post.content"></section>
        </div>
      </div>
      <CommentComponent></CommentComponent>
      <div v-if="listComments" class="listComments">
        <div v-for="comment in listComments" :key="comment._id" class="comment">
          <div class="content-header">
            <div class="avatar">
              <img :src="URL_AVATAR + comment.user.avatar" alt="avatar" />
            </div>
            <div class="profile">
              <div class="top">
                <div class="user">
                  <p class="username">{{ comment.user.display_name }}</p>
                  <p class="email">@{{ comment.user.email.split("@")[0] }}</p>
                </div>
                <span>Published Feb 10th, 1:43 p.m.</span>
              </div>
            </div>
          </div>
          <div v-html="comment.content" class="commentContent"></div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 20%;
}
main .post-active {
  width: 10%;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
main .post-active i {
  cursor: pointer;
}
.post-active .bookmark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgb(14, 93, 197);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(14, 93, 197);
  font-size: 24px;
}
.post-active .vote {
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: gray;
}

.post-active .share {
  border: 0.5px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 30px;
  height: 30px;
}

.post-active .vote i:hover {
  color: black;
}
.post-active .vote span {
  color: black;
  font-size: 2rem;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.follow {
  padding: 5px 20px;
  border: 1px solid blue;
}
.follow:hover {
  background-color: blue;
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
}
.content-header {
  display: flex;
}
.profile {
  display: flex;
  flex-direction: column;
}
.profile .top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.profile .top .user {
  display: flex;
  flex-direction: row;
  align-items: space-around;
}
.profile .bottom {
  display: flex;
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
.listComments {
  height: 500px;
}
</style>
