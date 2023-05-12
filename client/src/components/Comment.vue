<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
import { getReadableDate, getTimeSincePost } from "../utils/time";
import CommentEditor from "./CommentEditor.vue";
import ContentComment from "./postComponents/Content.vue";
import OpenOptionBtn from "./comment/OpenOptionBtn.vue";
import AuthorPostDetail from "./card/AuthorPostDetail.vue";

const store = useStore();
const props = defineProps(["comment", "limit"]);
let comment = props.comment;
watch(props, () => {
  comment = props.comment;
  maxReplies.value = comment.commentsReply.length;
});

const user = computed(() => store.getters["auth/getUser"]);
const selectedComment = ref(null);
const selectedReplyComment = ref(null);
const maxReplies = ref(2);
function commented() {
  selectedComment.value = null;
  selectedReplyComment.value = null;
}

async function handleReplyComment(replyCommentId, commentId) {
  selectedReplyComment.value = replyCommentId;
  selectedComment.value = commentId;
  if (!user.value) {
    await store.dispatch("route/setShowModalLogin", {
      isShow: true,
    });
  }
}

const showCard = ref(false);
const showCardReplyCmt = ref(null);
</script>

<template>
  <section class="comment">
    <div class="border-solid border-blue-400">
      <div class="flex w-full justify-between items-center">
        <div
          class="flex items-center relative"
          @mouseover="showCard = true"
          @mouseleave="showCard = false"
        >
          <img
            class="w-14 h-14 border rounded-full bg-gray-500 border-gray-300"
            :src="URL_AVATAR + comment.user.avatar"
            alt="avatar"
          />
          <p class="ml-2">{{ comment.user.display_name }}</p>

          <AuthorPostDetail
            v-if="showCard"
            :authorId="comment.user._id"
          ></AuthorPostDetail>
        </div>
        <div class="flex justify-center items-center">
          <span class="mr-3 text-slate-500 text-sm">{{
            getReadableDate(comment.updatedAt)
          }}</span>
          <OpenOptionBtn
            :commentId="comment._id"
            :authorId="comment.user._id"
            :limit="limit"
          ></OpenOptionBtn>
        </div>
      </div>
      <ContentComment :content="comment.content" class="mt-3"></ContentComment>
      <button
        @click="handleReplyComment(null, comment._id)"
        class="flex items-center text-base text-gray-500 hover:underline dark:text-gray-400"
      >
        <svg
          aria-hidden="true"
          class="mr-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
        Reply
      </button>
      <CommentEditor
        @commented="commented"
        v-if="selectedComment === comment._id"
        :inReplyToComment="comment._id"
        :inReplyToUser="comment.user.email"
        :limit="limit"
      ></CommentEditor>
    </div>
    <div class="commentsReply">
      <div
        v-for="commentReply in comment.commentsReply.slice(0, maxReplies)"
        :key="commentReply._id"
        :id="commentReply._id"
        class="commentReply"
      >
        <div class="flex w-full justify-between items-center">
          <div
            class="flex items-center relative"
            @mouseover="showCardReplyCmt = commentReply._id"
            @mouseleave="showCardReplyCmt = null"
          >
            <img
              class="w-14 h-14 border rounded-full bg-gray-500 border-gray-300"
              :src="URL_AVATAR + commentReply.user.avatar"
              alt="avatar"
            />
            <AuthorPostDetail
              v-if="showCardReplyCmt == commentReply._id"
              :authorId="commentReply.user._id"
            ></AuthorPostDetail>
            <p class="ml-2">{{ commentReply.user.display_name }}</p>
          </div>
          <div class="flex justify-center items-center">
            <span class="text-slate-500 text-sm mr-4">{{
              getReadableDate(commentReply.updatedAt)
            }}</span>
            <OpenOptionBtn
              :commentId="commentReply._id"
              :authorId="commentReply.user._id"
              :limit="limit"
            ></OpenOptionBtn>
          </div>
        </div>
        <div v-html="commentReply.content" class="mt-2"></div>
        <button
          @click="handleReplyComment(commentReply._id, null)"
          class="flex items-center text-base text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            aria-hidden="true"
            class="mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          Reply
        </button>

        <CommentEditor
          @commented="commented"
          v-if="selectedReplyComment === commentReply._id"
          :inReplyToComment="comment._id"
          :inReplyToUser="commentReply.user.email"
          :limit="limit"
        ></CommentEditor>
      </div>
      <div
        class="flex mt-1 justify-center items-center text-xs text-blue-500 cursor-pointer"
      >
        <span
          v-if="comment.commentsReply.length > maxReplies"
          @click="maxReplies = comment.commentsReply.length"
        >
          Show {{ comment.commentsReply.length }} replies
        </span>
        <span
          v-if="
            comment.commentsReply.length == maxReplies &&
            comment.commentsReply.length > 2
          "
          @click="maxReplies = 2"
        >
          Hide replies
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comment {
  border: 0.5px solid;
  border-color: #dddddd;
  padding: 20px;
  margin: 0 0 10px 0;
}
.comment .commentReply {
  margin: 10px 0 0 30px;
  padding: 15px;
  border-bottom: 0.5px solid;
  border-color: #dddddd;
}
</style>
