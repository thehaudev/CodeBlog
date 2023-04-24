<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = useStore();

const props = defineProps(["followTagId"]);
const emit = defineEmits(["followTagSubmit"]);

const user = computed(() => store.getters["auth/getUser"]);
const tagsFollowing = computed(
  () => (user.value && store.getters["auth/getTagsFollowing"]) || []
);
function checkFollowTag(id) {
  return tagsFollowing.value.some((e) => e.tagId == id);
}
async function fetchData() {
  if (user.value) await store.dispatch("auth/setTagsFollowing");
}
async function followTag(tagId) {
  if (user.value) {
    await store.dispatch("tags/follow", { tagId: tagId });
    await store.dispatch("auth/setTagsFollowing");
    emit("followTagSubmit");
  } else {
    await store.dispatch("route/setRouteBeforeLogin", {
      path: route.path,
    });
    router.push({ name: "login", params: {} });
  }
}

onMounted(fetchData);
</script>

<template>
  <div v-if="followTagId != user._id">
    <button
      v-if="checkFollowTag(followTagId)"
      @click="followTag(followTagId)"
      class="ml-10 flex items-center border border-gray-200 bg-gray-200 hover:bg-gray-400 text-black rounded outline-none focus:outline-none text-base py-1 px-3"
    >
      <span class="block">Following </span>
    </button>
    <button
      v-else
      @click="followTag(followTagId)"
      class="ml-10 flex items-center border border-blue-500 bg-blue-500 hover:bg-blue-600 text-white rounded outline-none focus:outline-none text-base py-1 px-3"
    >
      <span class="block">Follow</span>
    </button>
  </div>
</template>
