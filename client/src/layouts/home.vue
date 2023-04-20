<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import UsersList from "../components/postComponents/sections-blog-users-list.vue";
import Categories from "../components/postComponents/sections-categories-list.vue";
import RecentPost from "../components/postComponents/sections-recent-article.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Header></Header>
    <main>
      <!-- <slot></slot> -->
      <div class="px-6 py-8">
        <div class="flex justify-between container mx-auto">
          <slot></slot>
          <div class="-mx-8 w-4/12 hidden lg:block">
            <div class="px-8">
              <h1 class="mb-4 text-xl font-bold text-gray-700">
                <router-link :to="{ name: 'users' }">Authors</router-link>
              </h1>
              <UsersList></UsersList>
            </div>
            <div class="mt-10 px-8">
              <h1 class="mb-4 text-xl font-bold text-gray-700">
                <router-link :to="{ name: 'tags' }">Tags</router-link>
              </h1>
              <Categories></Categories>
            </div>
            <div class="mt-10 px-8">
              <h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
              <RecentPost></RecentPost>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<style scoped>
@import "../assets/css/app.css";

nav {
  position: -webkit-sticky;
  position: sticky;
  flex: 1;
}
main {
  width: 75%;
  margin: 0 auto;
  padding-top: 67px;
}
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}
</style>
