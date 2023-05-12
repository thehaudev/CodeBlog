<script setup>
import { onMounted, onUpdated } from "vue";

const props = defineProps(["items"]);

function scrollToElement(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 67;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, 10);
}
</script>
<template>
  <ul class="space-y-1" v-if="items.length">
    <li v-for="item in items" :key="item.id">
      <span
        :id="'span' + item.id"
        @click="scrollToElement(item.id)"
        class="text-gray-800 cursor-pointer hover:text-blue-500 hover:underline underline-offset-4"
        >{{ item.content }}</span
      >
      <TocList
        class="pl-3"
        v-if="item.subheadings.length"
        :items="item.subheadings"
      ></TocList>
    </li>
  </ul>
</template>
<style scoped>
.active {
  z-index: 10;
  font-weight: 500;
  position: relative;
  color: #5488c7;
}
</style>
