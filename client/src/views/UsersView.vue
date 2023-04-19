<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const search = ref("");
const page = ref(1);
const user = computed(() => store.getters["auth/getUser"]);
const listUsers = computed(() => store.getters["users/getAllUsers"]);
const paginationOfUsers = computed(() => store.getters["users/getPagination"]);
async function fetchData() {
  if (user.value) await store.dispatch("auth/setUsersFollowing");
  await store.dispatch("users/filterUser", {
    current_page: page.value,
    search: search.value,
  });
}
async function setUserPage(pageTag) {
  page.value = pageTag;
  await store.dispatch("users/filterUser", {
    current_page: page.value,
    search: search.value,
  });
}
watch(search, async () => {
  page.value = 1;
  await store.dispatch("users/filterUser", {
    current_page: page.value,
    search: search.value,
  });
});
const usersFollowing = computed(
  () => (user.value && store.getters["auth/getUsersFollowing"]) || []
);
function checkFollowUser(id) {
  return usersFollowing.value.some((e) => e.userId == id);
}

async function followUser(userId) {
  if (user.value) {
    await store.dispatch("users/follow", { userId: userId });
    await store.dispatch("auth/setUsersFollowing");
    await store.dispatch("users/filterUser", {
      current_page: page.value,
      search: search.value,
    });
  } else {
    await store.dispatch("route/setRouteBeforeLogin", {
      route: route.name,
    });
    router.push({ name: "login", params: {} });
  }
}
onMounted(fetchData);
</script>

<template>
  <main>
    <h1>User</h1>
    <input
      v-model="search"
      type="search"
      placeholder="Filter by display name"
      class="py-2 px-4"
    />
    <section class="tag-layout">
      <div v-for="user in listUsers" :key="user._id" class="item">
        <div class="">
          <img
            :src="URL_AVATAR + user.avatar"
            alt="avatar"
            class="w-12 h-12 rounded mr-2"
          />
        </div>
        <div>
          <p>
            <i class="fa-solid fa-user mr-1" style="color: #4ca8d6"></i
            >{{ user.display_name }}
          </p>
          <p class="ml-3 text-gray-400">@{{ user.email.split("@")[0] }}</p>
          <div class="flex">
            <p>
              <i class="fa-solid fa-star"></i>
              <span>10</span>
            </p>
            <p>
              <i class="fa-solid fa-user-plus"></i>
              <span>{{ user.followers.length }}</span>
            </p>
            <p>
              <i class="fa-solid fa-pencil"></i
              ><span>{{ user.posts.length }}</span>
            </p>
          </div>
          <button
            v-if="checkFollowUser(user._id)"
            @click="followUser(user._id)"
            style="color: #fff; background-color: #5488c7"
          >
            Following
          </button>
          <button v-else @click="followUser(user._id)">+ Follow</button>
        </div>
      </div>
    </section>
    <ul v-if="paginationOfUsers" class="pagination">
      <li href="#">&laquo;</li>
      <li
        v-for="n in paginationOfUsers.total_pages || 1"
        @click="setUserPage(n)"
        :key="n"
        :class="{ active: paginationOfUsers.current_page == n }"
        href="#"
      >
        {{ n }}
      </li>
      <li href="#">&raquo;</li>
    </ul>
  </main>
</template>
<style scoped>
.tag-layout {
  --columns: 4;
  --spacing: 30px;

  display: flex;
  flex-wrap: wrap;
  margin-left: calc(-1 * var(--spacing));
  padding: 32px 0;
  background-color: #fff;
}

.tag-layout .item {
  width: calc(100% / var(--columns) - var(--spacing));
  height: 90px;
  margin-left: var(--spacing);
  margin-top: var(--spacing);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
}
.item button {
  border: 2px solid #5488c7;
  color: #5488c7;
  border-radius: 5px;
  padding: 3px 15px;
}
.item button:hover {
  background-color: #5488c7;
  color: #fff;
}
.followed {
  background-color: #5488c7;
  color: #fff;
}
.pagination li {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
}

.pagination li.active {
  background-color: #4caf50;
  color: white;
}
</style>
