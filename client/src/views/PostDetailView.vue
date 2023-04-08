<script setup>
import { computed, reactive, ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
import CommentEditor from "../components/CommentEditor.vue";
import Comment from "../components/Comment.vue";
import { useVotePost } from "../composables/votePost";
import { useBookmark } from "../composables/bookmark";
import { useFollow } from "../composables/follow";
import { getReadableDate, getTimeSincePost } from "../utils/time";
const { follow } = useFollow();
const { bookmark } = useBookmark();
const { votePost } = useVotePost();
const store = useStore();
const route = useRoute();
const postId = computed(() => route.params.id);
const post = computed(() => store.getters["postDetail/getPost"]);

const listComments = computed(
  () => store.getters["comments/getCommentsInPost"]
);

const paginationOfComment = computed(
  () => store.getters["comments/getPaginationOfComments"]
);
async function setCommentPage(page) {
  await store.dispatch("comments/setCurrent_page", {
    current_page: page,
    postId: postId.value,
  });
}
const isVote = computed(() => store.getters["postDetail/isVote"]);
const isBookmark = computed(() => store.getters["postDetail/isBookmark"]);
const isFollow = computed(() => store.getters["postDetail/isFollow"]);
async function followBtn(followingId) {
  await follow(followingId);
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
  await store.dispatch("postDetail/fetchActive", { postId: postId.value });
}
async function vote(type) {
  await votePost(postId.value, type);
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
  await store.dispatch("postDetail/fetchActive", { postId: postId.value });
}
async function bookmarkBtn() {
  await bookmark(postId.value);
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
  await store.dispatch("postDetail/fetchActive", { postId: postId.value });
}
const fetchData = async () => {
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
  await store.dispatch("postDetail/fetchActive", { postId: postId.value });
  await store.dispatch("comments/fetchData", { postId: postId.value });
};
onMounted(fetchData);
</script>

<template>
  <main v-if="post">
    <div class="post-active">
      <div class="w-16">
        <img :src="URL_AVATAR + post.user.avatar" alt="avatar" />
      </div>
      <div class="vote">
        <i
          title="Upvote"
          class="fa-solid fa-caret-up"
          :class="{ active: isVote == 'Upvote' }"
          @click="vote('Upvote')"
        ></i>
        <span>{{ post.votes }}</span>
        <i
          title="Downvote"
          class="fa-solid fa-caret-down"
          :class="{ active: isVote == 'Downvote' }"
          @click="vote('Downvote')"
        ></i>
      </div>
      <div @click="bookmarkBtn()" title="Bookmarks this post" class="bookmark">
        <i v-if="isBookmark" class="fa-solid fa-bookmark"></i
        ><i v-else class="fa-regular fa-bookmark"></i>
      </div>
      <div title="Share a link to post on facebook" class="share mt-3">
        <i class="fa-brands fa-facebook-f"></i>
      </div>
    </div>
    <div class="container">
      <div class="post">
        <div class="content-header">
          <div class="profile">
            <div class="top">
              <div class="user item-center">
                <p class="username">{{ post.user.display_name }}</p>
                <p class="email ml-1 mr-1 text-gray-400">
                  @{{ post.user.email.split("@")[0] }}
                </p>
                <button
                  @click="followBtn(post.user._id)"
                  class="follow"
                  :class="{ active: isFollow }"
                >
                  {{ isFollow ? "Following" : "Follow" }}
                </button>
              </div>
              <span>{{ getReadableDate(post.updatedAt) }}</span>
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
      <span class="mt-3 text-2xl">Comments</span>
      <CommentEditor
        :inReplyToComment="null"
        :inReplyToUser="null"
      ></CommentEditor>
      <div v-if="listComments">
        <Comment
          v-for="comment in listComments"
          :key="comment._id"
          :comment="comment"
        ></Comment>
      </div>

      <ul
        v-if="paginationOfComment && listComments && listComments.length"
        class="pagination"
      >
        <li href="#">&laquo;</li>
        <li
          v-for="n in paginationOfComment.total_pages"
          @click="setCommentPage(n)"
          :key="n"
          :class="{ active: paginationOfComment.current_page == n }"
          href="#"
        >
          {{ n }}
        </li>
        <li href="#">&raquo;</li>
      </ul>
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
  border: 1px solid #0e5dc5;
  padding: 3px 10px;
  border-radius: 5px;
}
.follow:hover {
  background-color: #0e5dc5;
}

.post .title {
  font-size: 24px;
  font-weight: bold;
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
.profile .active {
  background-color: #0e5dc5;
}
.vote .active {
  color: black;
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
