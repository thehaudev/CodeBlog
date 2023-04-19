<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Header></Header>
    <div style="height: 67px"></div>
    <main>
      <slot></slot>
    </main>
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
  width: 75%;
  margin: 0 auto;
}
</style>
