<template>
  <div>
    <Header></Header>
    <main>
      <slot></slot>
    </main>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
main {
  padding-top: 67px;
  min-height: 100vh;
}
</style>
