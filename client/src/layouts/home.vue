<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div>
    <Header></Header>
    <div style="height: 67px"></div>
    <div class="flex">
      <nav>
        <ul>
          <li><router-link :to="{ name: 'home' }">Posts</router-link></li>
          <li>Questions</li>
          <li><router-link :to="{ name: 'tags' }">Tags</router-link></li>
          <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        </ul>
      </nav>
      <main>
        <slot></slot>
      </main>
    </div>
    <Footer></Footer>
  </div>
</template>
<style scoped>
nav {
  position: -webkit-sticky;
  position: sticky;
  flex: 1;
}
main {
  flex: 5;
}
</style>
