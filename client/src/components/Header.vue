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
    class="bg-gray-50 py-3 border-solid border-t-4 border-blue-800 shadow-md w-full fixed top-0"
  >
    <div class="container mx-auto flex justify-around items-center">
      <router-link to="/" class="flex items-end">
        <div id="logo" class="relative">
          <div class="rounded-full bg-blue-600 h-10 w-10"></div>
          <div
            class="rounded-full bg-white h-5 w-5 absolute bottom-1 right-1"
          ></div>
        </div>
        <div class="text-gray-800 font-semibold font-serif text-2xl ml-2">
          codeBlog
        </div>
      </router-link>
      <ul class="flex gap-6 text-md">
        <li class="hover:text-blue-800 p-2"><a href="#">About</a></li>
        <li class="hover:text-blue-800 p-2"><a href="#">Products</a></li>
        <li class="hover:text-blue-800 p-2"><a href="#">For Teams</a></li>
      </ul>
      <div class="flex gap-5">
        <section
          class="px-2 py-1 bg-white rounded-md border-solid border border-blue-500"
        >
          <i class="fa-solid fa-magnifying-glass mr-2 text-blue-500"></i>
          <input
            type="text"
            v-model="searchInput"
            @keyup.enter="searchSubmit"
            placeholder="Search..."
          />
        </section>

        <section v-if="!user" class="flex gap-2">
          <router-link
            class="bg-blue-600 px-2 py-1 text-white rounded-md border border-solid font-semibold border-blue-800"
            to="/auth/login"
            >Log in</router-link
          >
          <router-link
            class="bg-blue-100 px-2 py-1 text-blue-800 rounded-md border border-solid font-semibold border-blue-800"
            to="/auth/register"
            >Sign up</router-link
          >
        </section>
        <section v-else class="isLogged flex gap-2">
          <div class="bell">
            <i class="fa-regular fa-bell"></i>
            <span class="badge">{{ totalNotRead }}</span>
            <ul class="sub-menu">
              <li v-for="notification in notifications" :key="notification._id">
                <router-link :to="notification.link">
                  <div v-html="notification.content"></div>
                  <span>{{ getTimeSincePost(notification.updatedAt) }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="write">
            <i class="fa-regular fa-pen-to-square"></i>
            <ul class="sub-menu">
              <li>
                <router-link :to="{ name: 'post' }"
                  ><i class="fa-solid fa-pencil"></i>Write post</router-link
                >
              </li>
              <li>
                <router-link to="#"
                  ><i class="fa-solid fa-circle-question"></i>Ask
                  question</router-link
                >
              </li>
            </ul>
          </div>
          <div class="avatar">
            <img :src="URL_AVATAR + user.avatar" alt="avatar" />
            <ul class="sub-menu">
              <li class="account">
                <img :src="URL_AVATAR + user.avatar" alt="avatar" />
                <div class="name">
                  <p class="display">{{ user.display_name }}</p>
                  <p class="email">@{{ user.email.split("@")[0] }}</p>
                </div>
              </li>
              <li>
                <router-link to="#!"
                  ><i class="fa-solid fa-user"></i>Profile</router-link
                >
              </li>
              <li>
                <router-link to="#!"
                  ><i class="fa-solid fa-gear"></i>Preferences</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'logout' }"
                  ><i class="fa-solid fa-right-from-bracket"></i>Sign
                  out</router-link
                >
              </li>
            </ul>
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

.isLogged {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 120px;
}
.isLogged .avatar {
  /* Center the content */
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  /* Size */
  height: 40px;
}
.isLogged .avatar img {
  height: 100%;
  border-radius: 50%;
}
.isLogged .write {
  font-size: 22px;
  color: #666;
  position: relative;
  padding: 0 0 0 0;
}
.bell {
  position: relative;
  font-size: 22px;
  color: #666;
}
.bell .badge {
  position: absolute;
  top: -8px;
  right: -8px;
  color: #fff;
  background: #f56c6c;
  font-size: 12px;
  padding: 1px 2px;
  border-radius: 50%;
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

.avatar a {
  color: #fff;
  text-decoration: none;
}

.sub-menu {
  color: #606266;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 100%;
  right: 0px;

  background: #fff;
  border-radius: 5px;
  border: 0.5px solid #e4e4e4;
  display: none;
}
.avatar .sub-menu {
  width: 220px;
  height: 200px;
}
.write .sub-menu {
  width: 150px;
  height: 80px;
  font-size: 16px;
  right: -100%;
}
.bell .sub-menu {
  width: 400px;
  font-size: 16px;
  right: -300%;
}
.sub-menu li {
  flex: 1;
}

.sub-menu .account {
  display: flex;
  align-items: self-start;
  justify-content: space-around;
  color: #5488c7;
  background-color: #f0f0f0;
  padding: 5px 0;
}
.sub-menu i {
  margin: 0 10px 0 0;
}

.account img {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

.account .name {
  margin: 10px 0 0;
}

.name .email {
  margin: 5px 0 0;
  color: #b1c1d5;
}

.sub-menu li:hover {
  background: #ddd;
}

.sub-menu a {
  display: block;
  padding: 8px 16px;
  color: #333;
}
.avatar .sub-menu > li:last-child {
  border-top: 1px solid #ccc;
}
</style>
