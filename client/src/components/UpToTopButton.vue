<template>
  <div @click="scrollToTop" ref="appButton" class="app-button">
    <i class="fa-solid fa-arrow-up" style="color: #ffffff"></i>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";
const appButton = ref();
const userScroll = () => {
  if (window.scrollY > 0) {
    appButton.value.classList.add("showButton");
  } else {
    appButton.value.classList.remove("showButton");
  }
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
onMounted(() => {
  window.addEventListener("scroll", userScroll);
});
onBeforeMount(() => {
  window.removeEventListener("scroll", userScroll);
});
</script>

<style scoped>
.app-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #328abd;
  cursor: pointer;
  display: none;
}

.showButton {
  display: block;
}
</style>
