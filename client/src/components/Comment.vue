<script setup>
import { ref, computed, reactive, watch } from "vue";
import { URL_AVATAR } from "../constants/index";
import { getReadableDate, getTimeSincePost } from "../utils/time";
import CommentEditor from "./CommentEditor.vue";
const props = defineProps({
  comment: {},
});
let comment = props.comment;
watch(props, () => {
  comment = props.comment;
  maxReplies.value = comment.commentsReply.length;
});

const selectedComment = ref(null);
const selectedReplyComment = ref(null);
const maxReplies = ref(2);
function commented() {
  selectedComment.value = null;
  selectedReplyComment.value = null;
}
</script>

<template>
  <section class="comment">
    <div class="border-solid border-blue-400">
      <div class="flex">
        <div class="w-14">
          <img :src="URL_AVATAR + comment.user.avatar" alt="avatar" />
        </div>
        <div class="flex mt-3 ml-3">
          <p class="">{{ comment.user.display_name }}</p>
          <span class="ml-14 text-slate-500">{{
            getReadableDate(comment.updatedAt)
          }}</span>
        </div>
      </div>
      <div v-html="comment.content" class=""></div>
      <!-- <span
        @click="(selectedReplyComment = null), (selectedComment = comment._id)"
        class="text-blue-500 cursor-pointer"
        >Reply</span
      > -->
      <button
        @click="(selectedReplyComment = null), (selectedComment = comment._id)"
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
      ></CommentEditor>
    </div>
    <div class="">
      <div
        v-for="commentReply in comment.commentsReply.slice(0, maxReplies)"
        :key="commentReply._id"
        :id="commentReply._id"
        class="commentReply"
      >
        <div class="flex">
          <div class="w-14">
            <img :src="URL_AVATAR + commentReply.user.avatar" alt="avatar" />
          </div>
          <div class="flex mt-3 ml-3">
            <p class="">{{ commentReply.user.display_name }}</p>
            <span class="ml-14 text-slate-500">{{
              getReadableDate(commentReply.updatedAt)
            }}</span>
          </div>
        </div>
        <div v-html="commentReply.content"></div>
        <button
          @click="
            (selectedReplyComment = commentReply._id), (selectedComment = null)
          "
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
        ></CommentEditor>
      </div>
      <span
        v-if="comment.commentsReply.length > maxReplies"
        class="flex justify-center text-blue-500 cursor-pointer"
        @click="maxReplies = comment.commentsReply.length"
      >
        Show {{ comment.commentsReply.length }} replies
      </span>
      <span
        v-if="
          comment.commentsReply.length == maxReplies &&
          comment.commentsReply.length > 2
        "
        class="flex justify-center text-blue-500 cursor-pointer"
        @click="maxReplies = 2"
      >
        Hide replies
      </span>
    </div>
  </section>
</template>

<style scoped>
.comment {
  border-bottom: 0.5px solid;
  border-color: #dddddd;
  padding: 20px;
}
.comment .commentReply {
  margin: 10px 0 0 30px;
}
</style>
