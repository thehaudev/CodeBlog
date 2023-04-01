<template>
  <header>
    <div class="container">
      <!-- <section class="bars">
        <i class="fa-solid fa-bars"></i>
      </section> -->
      <router-link to="/" class="logo">
        <img src="../assets/favicon/ms-icon-70x70.png" alt="favicon" />
        <p>codeBlog</p>
      </router-link>
      <ul class="menu">
        <li><a href="#">About</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">For Teams</a></li>
      </ul>
      <section class="search">
        <i class="fa-solid fa-magnifying-glass" style="color: #838c95"></i>
        <input type="text" placeholder="Search..." />
      </section>
      <section v-if="!user" class="auth">
        <router-link class="login" to="/auth/login">Log in</router-link>
        <router-link class="signup" to="/auth/register">Sign up</router-link>
      </section>
      <section v-else class="isLogged">
        <div class="bell">
          <i class="fa-regular fa-bell"></i>
          <span class="badge">12</span>
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
                <p class="display">Huỳnh thế hậu</p>
                <p class="email">@thehau</p>
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
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
const store = useStore();

const user = computed(() => {
  return store.getters["auth/getUser"];
});
</script>
<style scoped>
header {
  height: 50px;
  background-color: #f1f2f3;
  border-bottom: 0.1px solid #e1e2e2;
  border-top: 0.2px solid #f48225;
  box-shadow: 0 4px 2px -2px rgb(206, 205, 205);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
}
.container {
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
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
.logo {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  object-fit: contain;
  max-height: 40px;
}
.logo p {
  margin-left: 5px;
  font-size: 24px;
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
.search i {
  margin: 0 10px;
  font-size: 18px;
}
.search input {
  width: 90%;
  height: 70%;
}

.search input:focus .search {
  border-color: #1b74e4;
  box-shadow: 3px#5d98e0;
  outline: 0;
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
  height: 80%;
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
  padding: 1px;
  border-radius: 4px;
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
.sub-menu > li:last-child {
  border-top: 1px solid #ccc;
}
</style>
