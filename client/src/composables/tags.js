import instance from "../configs/axios";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

async function getAllTags({ current_page, search, sort }) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await instance.get("/tags", {
      params: {
        sort: sort,
        page: current_page,
        search: search,
      },
    });
    return res.data.data;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}

export function useTags() {
  return { error, isPending, getAllTags };
}
