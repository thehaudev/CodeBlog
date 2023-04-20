<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { URL_AVATAR } from "../../constants";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const search = ref("");
const page = ref(1);
// const user = computed(() => store.getters["auth/getUser"]);
const listUsers = computed(() => store.getters["users/getUsersShowInHome"]);
async function fetchData() {
  // if (user.value) await store.dispatch("auth/setUsersFollowing");
  await store.dispatch("users/filterUsersShowInHome", {
    limit: 6,
    sort: "follower",
    current_page: page.value,
    search: search.value,
  });
}
onMounted(fetchData);
</script>

<template>
  <div
    v-if="listUsers"
    class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md"
  >
    <ul class="-mx-4">
      <!-- 5 -->
      <li
        v-for="user in listUsers"
        :key="user._id"
        class="flex items-center"
        :class="{ 'mt-6': user !== listUsers[0] }"
      >
        <img
          class="w-10 h-10 object-cover rounded-full mx-4"
          :src="URL_AVATAR + user.avatar"
          :alt="user.display_name"
        />
        <p>
          <a class="text-gray-700 font-bold mx-1 hover:underline" href="#">{{
            user.display_name
          }}</a>
          <span class="text-gray-700 text-sm font-light"
            >Created {{ user.posts }} Posts</span
          >
        </p>
      </li>
    </ul>
  </div>
  <div
    v-else
    class="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96"
  >
    <div class="h-48 rounded-t bg-gray-300"></div>
    <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
      <div class="w-full h-6 rounded bg-gray-300"></div>
      <div class="w-full h-6 rounded bg-gray-300"></div>
      <div class="w-3/4 h-6 rounded bg-gray-300"></div>
    </div>
  </div>
</template>
