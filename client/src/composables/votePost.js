import { instanceWithAccess } from "../configs/axios";

async function votePost(postId, type) {
  try {
    const res = await instanceWithAccess.get("/vote_post/" + postId);
    if (res.data.data) {
      await instanceWithAccess.delete("/vote_post", {
        data: {
          postId: postId,
        },
      });
    } else {
      const res = await instanceWithAccess.post("/vote_post", {
        postId: postId,
        type: type,
      });
      await instanceWithAccess.post(
        "/notifications/vote-post/" + res.data.data._id,
        {
          link: "/post/" + postId,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function useVotePost() {
  return { votePost };
}
