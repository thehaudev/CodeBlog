<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = store.getters["auth/user"];
</script>

<template>
  <main>
    <div>Home view</div>
  </main>
</template>
