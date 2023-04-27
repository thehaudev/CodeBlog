import { instance, instanceWithAccess } from "../configs/axios";

async function follow(followingId) {
  try {
    const res = await instanceWithAccess.get("/follow_user/", {
      params: {
        userId: followingId,
      },
    });
    if (res.data.data) {
      await instanceWithAccess.delete("/follow_user", {
        data: {
          userId: followingId,
        },
      });
    } else {
      await instanceWithAccess.post("/follow_user", {
        userId: followingId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function useFollow() {
  return { follow };
}
