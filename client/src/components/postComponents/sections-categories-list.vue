<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
const search = ref("");
const page = ref(1);

const store = useStore();
const router = useRouter();
async function fetchData() {
  await store.dispatch("tags/filterTag", {
    current_page: page.value,
    search: search.value,
    sort: "posts",
  });
}
const listTags = computed(() => store.getters["tags/getAllTags"]);

onMounted(fetchData);
</script>
<template>
  <div
    class="flex flex-wrap bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md"
  >
    <!-- <ul class="">
      <li v-for="tag in listTags" :key="tag._id">
        <a
          class="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline"
          href="#"
          >- {{ tag.title }}</a
        >
      </li>
    </ul> -->
    <div
      v-for="tag in listTags"
      :key="tag._id"
      class="mr-2 mb-2 cursor-pointer text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
    >
      {{ tag.title }}
      #{{ tag.posts }}
    </div>
  </div>
</template>
