<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();
const props = defineProps(["followUserId"]);
const emit = defineEmits(["followSubmit"]);

const usersFollowing = computed(
  () => (user.value && store.getters["auth/getUsersFollowing"]) || []
);
function checkFollowUser(id) {
  return usersFollowing.value.some((e) => e.userId == id);
}

const user = computed(() => store.getters["auth/getUser"]);

async function followUser(userId) {
  if (user.value) {
    await store.dispatch("users/follow", { userId: userId });
    await store.dispatch("auth/setUsersFollowing");
    emit("followSubmit");
  } else {
    await store.dispatch("route/setShowModalLogin", {
      isShow: true,
    });
  }
}
onMounted(async () => {
  if (user.value) await store.dispatch("auth/setUsersFollowing");
});
</script>

<template>
  <div v-if="!user || followUserId != user._id">
    <button
      v-if="checkFollowUser(followUserId)"
      @click="followUser(followUserId)"
      class="ml-10 flex items-center border border-gray-200 bg-gray-200 hover:bg-gray-400 text-black rounded outline-none focus:outline-none text-base py-1 px-3"
    >
      <span class="block">Following </span>
    </button>
    <button
      v-else
      @click="followUser(followUserId)"
      class="ml-10 flex items-center border border-blue-500 bg-blue-500 hover:bg-blue-600 text-white rounded outline-none focus:outline-none text-base py-1 px-3"
    >
      <span class="block">Follow</span>
    </button>
  </div>
</template>
