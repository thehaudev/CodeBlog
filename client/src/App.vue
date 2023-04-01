<template>
  <component :is="layout">
    <RouterView></RouterView>
  </component>
</template>
<script setup>
import { RouterView, useRoute } from "vue-router";
import { PUBLIC_LAYOUT } from "./constants/index";
import { computed } from "vue";
const route = useRoute();
const layout = computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout");
</script>
