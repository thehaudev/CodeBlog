import { instance, instanceWithAccess } from "../configs/axios";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

async function createPost(title, content, tags, coverImageUrl) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await instanceWithAccess.post("/posts", {
      title: title,
      content: content,
      coverImageUrl: coverImageUrl,
    });
    const id = res.data.data._id;
    const newTags = tags.map((e) => {
      const obj = {
        postId: id,
        tagId: e,
      };
      return obj;
    });
    await instanceWithAccess.post("/post_tag", newTags);
    return res.data.data;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}

async function getPost(postId) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await instance.get("/posts/" + postId);
    return res.data.post;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}

export function usePost() {
  return { error, isPending, createPost, getPost };
}
