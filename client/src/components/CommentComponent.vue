<template>
  <div v-if="user" class="comments">
    <div v-if="user" class="postComment">
      <div class="avatar">
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
<script setup>
import EditorMarkdown from "../components/EditorMarkdown.vue";
import { computed, ref, inject } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useComment } from "../composables/comment";
import { URL_AVATAR } from "../constants";
const route = useRoute();
const store = useStore();
const postId = computed(() => route.params.id);
const user = computed(() => store.getters["auth/getUser"]);
const { error, isPending, createComment } = useComment();

const content = ref("");
async function postComment() {
  await createComment(postId.value, content.value);
}
var toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
];
</script>
<style scoped>
main {
  width: 100%;
}
.comments {
  width: 100%;
  min-height: 200px;
  border: 1px solid grey;
  position: relative;
  display: flex;
  flex-direction: column;
}

.comments .comment-btn {
  border: 1px solid grey;
  padding: 5px 20px;
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
  flex: 5;
}
</style>
