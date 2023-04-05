<template>
  <div>
    <Header></Header>
    <div style="height: 67px"></div>
    <slot></slot>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped></style>
