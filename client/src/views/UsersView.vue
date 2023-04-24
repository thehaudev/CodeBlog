<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Author from "../components/card/author.vue";
const store = useStore();
const search = ref("");
const page = ref(1);
const user = computed(() => store.getters["auth/getUser"]);

const listUsers = computed(() => store.getters["users/getAllUsers"]);
const paginationOfUsers = computed(() => store.getters["users/getPagination"]);
async function fetchData() {
  if (user.value) await store.dispatch("auth/setUsersFollowing");
  await store.dispatch("users/filterUser", {
    sort: "follower",
    current_page: page.value,
    search: search.value,
  });
}
async function setUserPage(pageTag) {
  page.value = pageTag;
  await store.dispatch("users/filterUser", {
    sort: "follower",

    current_page: page.value,
    search: search.value,
  });
}
watch(search, async () => {
  page.value = 1;
  await store.dispatch("users/filterUser", {
    sort: "follower",

    current_page: page.value,
    search: search.value,
  });
});

onMounted(fetchData);
</script>

<template>
  <div class="w-full lg:w-8/12" v-if="listUsers && paginationOfUsers">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-700 md:text-2xl">
        User({{ paginationOfUsers.total }})
      </h1>
    </div>
    <input
      v-model="search"
      type="search"
      placeholder="Filter by display name"
      class="py-2 px-4"
    />
    <section class="tag-layout">
      <Author v-for="user in listUsers" :key="user._id" :author="user"></Author>
      <!-- <div v-for="user in listUsers" :key="user._id" class="item">
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
              <span>{{ user.followers }}</span>
            </p>
            <p>
              <i class="fa-solid fa-pencil"></i><span>{{ user.posts }}</span>
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
      </div> -->
    </section>
    <!-- pagination -->
    <div class="mt-8" v-if="paginationOfUsers.total_pages != 0">
      <ul class="flex">
        <li
          @click="
            paginationOfUsers.current_page != 1 &&
              setUserPage(paginationOfUsers.current_page - 1)
          "
          :class="{
            hover_pagi: paginationOfUsers.current_page != 1,
          }"
          class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer"
        >
          <span class="flex items-center font-bold">previous</span>
        </li>
        <li
          v-for="n in paginationOfUsers.total_pages"
          @click="setUserPage(n)"
          :key="n"
          :class="{ active: paginationOfUsers.current_page == n }"
          class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg cursor-pointer"
        >
          <span class="font-bold">{{ n }}</span>
        </li>
        <li
          @click="
            paginationOfUsers.current_page != paginationOfUsers.total_pages &&
              setUserPage(paginationOfUsers.current_page + 1)
          "
          :class="{
            hover_pagi:
              paginationOfUsers.current_page != paginationOfUsers.total_pages,
          }"
          class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-pointer"
        >
          <span class="flex items-center font-bold">Next</span>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-col items-center mt-10">
      <i class="fa-solid fa-magnifying-glass fa-2xl"></i>
      <p class="mt-4">
        We couldn't find anything for
        <span class="font-medium">{{ search }}</span>
      </p>
    </div>
  </div>
</template>
<style scoped>
.tag-layout {
  --columns: 4;
  --spacing: 30px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

.active {
  background-color: rgb(55 65 81 / 1);
  color: rgb(229 231 235 / 1);
}
.hover_pagi {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.hover_pagi:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity));
  color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>
