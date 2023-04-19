<template>
  <div>
    <select
      v-model="sort"
      class="block bg-gray-300 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3 cursor-pointer"
    >
      <option value="latest">Newest</option>
      <option value="views">Views</option>
      <option value="votes">Votes</option>
      <option value="comments">Comments</option>
    </select>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const sort = ref("latest");
const emit = defineEmits(["selectSort"]);

watch(sort, () => {
  emit("selectSort", sort.value);
});
</script>
