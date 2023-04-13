import instance from "../configs/axios";
import { ref } from "vue";

async function votePost(postId, type) {
  try {
    const res = await instance.get("/vote_post/" + postId);
    if (res.data.data) {
      await instance.delete("/vote_post", {
        data: {
          postId: postId,
        },
      });
    } else {
      const res = await instance.post("/vote_post", {
        postId: postId,
        type: type,
      });
      console.log(res);
      await instance.post("/notifications/vote-post/" + res.data.data._id, {
        link: "/post/" + postId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function useVotePost() {
  return { votePost };
}
