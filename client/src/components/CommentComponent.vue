<script setup>
import { getTimeSincePost, getReadableDate } from "../utils/time";
import EditorMarkdown from "../components/EditorMarkdown.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useComment } from "../composables/comment";
import { URL_AVATAR } from "../constants";
const route = useRoute();
const store = useStore();
const postId = computed(() => route.params.id);
const user = computed(() => store.getters["auth/getUser"]);

const { createComment } = useComment();
const props = defineProps({ inReplyToComment: String, inReplyToUser: String });
const emit = defineEmits(["commented"]);
const content = ref(" ");
if (props.inReplyToUser) content.value = "@" + props.inReplyToUser + " ";
async function postComment() {
  await createComment(
    props.inReplyToComment,
    props.inReplyToUser,
    postId.value,
    content.value
  );
  content.value = " ";
  emit("commented");
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
}
var toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
];
</script>
<template>
  <div v-if="user" class="comments mt-10 p-4">
    <div class="postComment">
      <div class="avatar mr-2">
        <img :src="URL_AVATAR + user.avatar" alt="avatar" />
      </div>
      <div class="content">
        <EditorMarkdown
          v-model:content="content"
          :toolbar="toolbarOptions"
        ></EditorMarkdown>
      </div>
    </div>
    <button class="comment-btn" @click="postComment()">Comment</button>
  </div>
</template>
<style scoped>
main {
  width: 100%;
}
.comments {
  width: 100%;
  border: 1px solid grey;
  position: relative;
  display: flex;
  flex-direction: column;
}

.comments .comment-btn {
  border: 1px solid grey;
  padding: 5px;
  width: 100px;
  font-size: 16px;
  align-self: flex-end;
  margin: 10px 20px 0 0;
}
.comments .postComment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.postComment .avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.postComment .avatar img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.postComment .content {
  padding: 0;
  border: none;
  flex: 5;
}
</style>
