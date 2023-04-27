import { instanceWithAccess } from "../configs/axios";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

async function createComment(inReplyToComment, inReplyToUser, postId, content) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await instanceWithAccess.post(
      "/posts/" + postId + "/comments",
      {
        content: content,
        inReplyToComment: inReplyToComment,
        inReplyToUser: inReplyToUser,
      }
    );
    return res.data.comment;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}

export function useComment() {
  return { error, isPending, createComment };
}
