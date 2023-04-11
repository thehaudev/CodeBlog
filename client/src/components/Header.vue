<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
import { useRouter } from "vue-router";
import { getReadableDate, getTimeSincePost } from "../utils/time";

async function fetchData() {
  await store.dispatch("notifications/setNotificationOfUser");
}
const router = useRouter();

const searchInput = ref("");
const store = useStore();
const user = computed(() => store.getters["auth/getUser"]);
const notifications = computed(
  () => store.getters["notifications/getNotifications"]
);
const totalNotRead = computed(
  () => store.getters["notifications/getTotalNotRead"]
);
onMounted(fetchData);
</script>
<template>
  <header
    class="fixed top-0 w-full py-3 border-t-4 border-blue-800 border-solid shadow-md bg-gray-50"
  >
    <div class="container flex items-center justify-around mx-auto">
      <router-link to="/" class="flex items-end">
        <div id="logo" class="relative">
          <div class="w-10 h-10 bg-blue-600 rounded-full"></div>
          <div
            class="absolute w-5 h-5 bg-white rounded-full bottom-1 right-1"
          ></div>
        </div>
        <div class="ml-2 font-serif text-2xl font-semibold text-gray-800">
          codeBlog
        </div>
      </router-link>
      <ul class="flex gap-6 text-md">
        <li class="p-2 hover:text-blue-800"><a href="#">About</a></li>
        <li class="p-2 hover:text-blue-800"><a href="#">Products</a></li>
        <li class="p-2 hover:text-blue-800"><a href="#">For Teams</a></li>
      </ul>
      <div class="flex gap-5">
        <section
          class="flex items-center px-3 py-1 bg-white border border-blue-500 border-solid rounded-md"
        >
          <i class="mr-2 text-blue-500 fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            v-model="searchInput"
            @keyup.enter="searchSubmit"
            placeholder="Search..."
          />
        </section>

        <section v-if="!user" class="flex gap-2">
          <router-link
            class="px-2 py-1 font-semibold text-white bg-blue-600 border border-blue-800 border-solid rounded-md"
            to="/auth/login"
            >Log in</router-link
          >
          <router-link
            class="px-2 py-1 font-semibold text-blue-800 bg-blue-100 border border-blue-800 border-solid rounded-md"
            to="/auth/register"
            >Sign up</router-link
          >
        </section>
        <section v-else class="isLogged flex items-end gap-2">
          <div class="relative bell">
            <div class="px-2 text-2xl">
              <i class="fa-regular fa-bell"></i>
            </div>
            <ul
              class="absolute right-0 z-10 flex-col hidden py-5 origin-top-right bg-white rounded-sm shadow-xl sub-menu min-w-max"
            >
              <li
                v-for="notification in notifications"
                :key="notification._id"
                class="hover:text-gray-700 hover:bg-gray-50"
              >
                <router-link :to="notification.link">
                  <div v-html="notification.content"></div>
                  <span>{{ getTimeSincePost(notification.updatedAt) }}</span>
                </router-link>
              </li>
            </ul>
            <div
              class="absolute flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full left-4 bottom-4"
            >
              {{ totalNotRead }}
            </div>
          </div>

          <div class="relative write">
            <div class="px-2 text-2xl">
              <i class="fa-regular fa-pen-to-square"></i>
            </div>
            <ul
              class="absolute right-0 z-10 flex-col hidden py-5 origin-top-right bg-white rounded-sm shadow-xl sub-menu min-w-max"
            >
              <li class="hover:text-gray-700 hover:bg-gray-50">
                <router-link :to="{ name: 'post' }" class="block px-4 py-1"
                  ><i class="mr-2 fa-solid fa-pencil"></i>Write
                  post</router-link
                >
              </li>
              <li class="hover:text-gray-700 hover:bg-gray-50">
                <router-link to="#" class="block px-4 py-1"
                  ><i class="mr-2 fa-solid fa-circle-question"></i>Ask
                  question</router-link
                >
              </li>
            </ul>
          </div>
          <div class="relative avatar">
            <div class="w-10 h-10">
              <img :src="URL_AVATAR + user.avatar" />
            </div>
            <div
              class="absolute right-0 z-10 flex-col hidden py-5 origin-top-right bg-white rounded-sm shadow-xl sub-menu min-w-max"
            >
              <div class="flex items-center h-10 gap-3 px-4 mb-4">
                <img
                  class="h-14"
                  :src="URL_AVATAR + user.avatar"
                  alt="avatar"
                />
                <div class="">
                  <p class="display">{{ user.display_name }}</p>
                  <p class="email">@{{ user.email.split("@")[0] }}</p>
                </div>
              </div>
              <div class="hover:text-gray-700 hover:bg-gray-50">
                <router-link class="block px-4 py-1" to="#!"
                  ><i class="mr-2 fa-solid fa-user"></i>Profile</router-link
                >
              </div>
              <div class="hover:text-gray-700 hover:bg-gray-50">
                <router-link class="block px-4 py-1" to="#!"
                  ><i class="mr-2 fa-solid fa-gear"></i>Preferences</router-link
                >
              </div>
              <div class="hover:text-gray-700 hover:bg-gray-50">
                <router-link class="block px-4 py-1" :to="{ name: 'logout' }"
                  ><i class="mr-2 fa-solid fa-right-from-bracket"></i>Sign
                  out</router-link
                >
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </header>
</template>

<style scoped>
textarea:focus,
input:focus {
  outline: none;
}
.bars {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 10px;
}
.bars i {
  font-size: 24px;
  color: #525960;
}

.menu {
  display: flex;
  align-items: center;
  height: 100%;
}
.menu li {
  margin: 0 15px;
}

.search {
  display: flex;
  align-items: center;
  height: 70%;
  border: 1px solid #babfc4;
  background-color: #fff;
  min-width: 450px;
  max-width: 500px;
  border-radius: 5px;
}

.auth {
  display: flex;
  align-items: center;
  height: 100%;
}
.auth .login,
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 60px;
  border: 1px solid #7aa7c7;
  border-radius: 3px;
  margin: 0 7px;
}
.auth .login {
  background-color: #e1ecf4;
  color: #7aa7c7;
}

.auth .signup {
  background-color: #0a95ff;
  color: #fff;
}

.bell:hover .sub-menu {
  display: flex;
}
/* .bell .write  */
.write:hover .sub-menu {
  display: flex;
}
.avatar:hover .sub-menu {
  display: flex;
}
/* .sub-menu {
  display: none;
} */
</style>
