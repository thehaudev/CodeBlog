<script setup>
import { ref } from "vue";
import eventBus from "../../utils/evenBus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const isShow = ref(false);
eventBus.on("showChangesPasswordSuccess", () => {
  isShow.value = true;
});
const handleLogin = async () => {
  await store.dispatch("auth/setUserToken", { user: null });
  router.push({ name: "login" });
  isShow.value = false;
};
</script>
<template>
  <div
    v-if="isShow"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50"
  >
    <div
      class="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-gray-50 text-gray-800"
    >
      <h2 class="text-xl font-semibold leading-tight tracking-wide">
        Attention!!
      </h2>
      <p class="flex-1 text-gray-600">
        Change password success, Please login again. <br />
        <b>Note:</b> The page will be reloaded.
      </p>
      <div class="flex flex-col justify-between gap-6 mt-6 sm:flex-row">
        <div class="flex items-center gap-2"></div>
        <button
          @click="handleLogin"
          class="px-6 py-2 rounded-sm shadow-sm bg-sky-600 text-gray-50"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
