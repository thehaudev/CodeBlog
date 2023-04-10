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
          <p class="">@{{ comment.user.email.split("@")[0] }}</p>
          <span class="ml-14 text-slate-500">{{
            getReadableDate(comment.updatedAt)
          }}</span>
        </div>
      </div>
      <div v-html="comment.content" class=""></div>
      <span
        @click="(selectedReplyComment = null), (selectedComment = comment._id)"
        class="text-blue-500 cursor-pointer"
        >Reply</span
      >
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
            <p class="">@{{ commentReply.user.email.split("@")[0] }}</p>
            <span class="ml-14 text-slate-500">{{
              getReadableDate(commentReply.updatedAt)
            }}</span>
          </div>
        </div>
        <div v-html="commentReply.content"></div>
        <span
          @click="
            (selectedReplyComment = commentReply._id), (selectedComment = null)
          "
          class="text-blue-500 cursor-pointer"
          >Reply</span
        >

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
        Show all {{ comment.commentsReply.length }} replies
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
