import { instanceWithAccess } from "../configs/axios";

async function bookmark(id) {
  try {
    const res = await instanceWithAccess.get("/bookmarks/" + id);
    if (res.data.data) {
      await instanceWithAccess.delete("/bookmarks/" + id);
    } else {
      await instanceWithAccess.post("/bookmarks/" + id);
    }
  } catch (error) {
    console.log(error);
  }
}
export function useBookmark() {
  return { bookmark };
}
