<template>
  <div>
    <Header></Header>
    <div style="height: 67px"></div>
    <body>
      <slot></slot>
    </body>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
body {
  height: calc(100vh-50px);
  width: 100%;
}
</style>
