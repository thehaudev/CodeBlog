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
const user = computed(() => store.getters["auth/getUser"]);
const listUsers = computed(() => store.getters["users/getAllUsers"]);
async function fetchData() {
  if (user.value) await store.dispatch("auth/setUsersFollowing");
  await store.dispatch("users/filterUser", {
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

      <!-- <li class="flex items-center mt-6">
        <img
          class="w-10 h-10 object-cover rounded-full mx-4"
          src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80"
          alt="avatar"
        />
        <p>
          <a class="text-gray-700 font-bold mx-1 hover:underline" href="#"
            >Jane Doe</a
          >
          <span class="text-gray-700 text-sm font-light">Created 52 Posts</span>
        </p>
      </li> -->
    </ul>
  </div>
</template>
