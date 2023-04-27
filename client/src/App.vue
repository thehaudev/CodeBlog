<template>
  <component :is="layout">
    <RouterView :key="route.fullPath"></RouterView>
  </component>
  <login-modal></login-modal>
  <UpToTopButton></UpToTopButton>
  <AccessExpired></AccessExpired>
</template>
<script setup>
import { RouterView, useRoute } from "vue-router";
import { PUBLIC_LAYOUT } from "./constants/index";
import LoginModal from "./components/LoginModal.vue";
import UpToTopButton from "./components/UpToTopButton.vue";
import AccessExpired from "./components/modal/AccessExpired.vue";
import { computed } from "vue";
const route = useRoute();
const layout = computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout");
</script>
