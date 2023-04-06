<script setup>
import { computed, reactive, ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
import { getTimeSincePost, getReadableDate } from "../utils/time";
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
const selectedComment = ref(null);
const selectedReplyComment = ref(null);
function commented() {
  selectedComment.value = null;
  selectedReplyComment.value = null;
}
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
const isDisplayListCommentReply = ref([]);
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
                  Follow
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
      <CommentComponent
        :inReplyToComment="null"
        :inReplyToUser="null"
      ></CommentComponent>
      <div v-if="listComments" class="listComments">
        <div v-for="comment in listComments" :key="comment._id">
          <div class="comment border-solid border-blue-400">
            <div class="flex">
              <div class="w-14">
                <img :src="URL_AVATAR + comment.user.avatar" alt="avatar" />
              </div>
              <div class="flex mt-3 ml-3">
                <p class="">@{{ comment.user.email.split("@")[0] }}</p>
                <span class="ml-14 text-slate-500">{{
                  getReadableDate(comment.updatedAt)
                }}</span>
              </div>
            </div>
            <div v-html="comment.content" class="commentContent"></div>
            <span
              @click="
                (selectedReplyComment = null), (selectedComment = comment._id)
              "
              class="text-blue-500 cursor-pointer"
              >Reply</span
            >
            <!-- <span
              v-if="
                comment.commentsReply.length < 4 && comment.commentReply.length
              "
              class="text-blue-500 cursor-pointer ml-3"
              >Hidden Comments</span
            >
            <span v-else class="text-blue-500 cursor-pointer ml-3"
              >Display Comments</span
            > -->
            <CommentComponent
              @commented="commented"
              v-if="selectedComment === comment._id"
              :inReplyToComment="comment._id"
              :inReplyToUser="comment.user.email.split('@')[0]"
            ></CommentComponent>
          </div>
          <div
            v-if="
              comment.commentsReply.length && comment.commentsReply.length < 5
            "
            class="listComments"
          >
            <div
              v-for="commentReply in comment.commentsReply"
              :key="commentReply._id"
              class="comment border-solid border-blue-400"
            >
              <div class="flex">
                <div class="w-14">
                  <img
                    :src="URL_AVATAR + commentReply.user.avatar"
                    alt="avatar"
                  />
                </div>
                <div class="flex mt-3 ml-3">
                  <p class="">@{{ commentReply.user.email.split("@")[0] }}</p>
                  <span class="ml-14 text-slate-500">{{
                    getReadableDate(commentReply.updatedAt)
                  }}</span>
                </div>
              </div>
              <div v-html="commentReply.content" class="commentContent"></div>
              <span
                @click="
                  (selectedReplyComment = commentReply._id),
                    (selectedComment = null)
                "
                class="text-blue-500 cursor-pointer"
                >Reply</span
              >
              <CommentComponent
                @commented="commented"
                v-if="selectedReplyComment === commentReply._id"
                :inReplyToComment="comment._id"
                :inReplyToUser="commentReply.user.email.split('@')[0]"
              ></CommentComponent>
            </div>
          </div>
        </div>
      </div>

      <ul v-if="paginationOfComment && listComments.length" class="pagination">
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

.listComments .comment {
  border-bottom: 0.5px solid #d6d6d7;
  padding: 15px;
}
.listComments .listComments {
  margin: 0 0 0 25px;
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
