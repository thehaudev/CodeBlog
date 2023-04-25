<script setup>
import FollowingUser from "./FollowingUser.vue";
import FollowingTag from "./FollowingTag.vue";
import { ref } from "vue";
const props = defineProps(["followingUser", "followingTag", "userName"]);
const emit = defineEmits(["closeModal"]);
const active = ref("people");
function closeModal(e) {
  if (!event.target.closest(".modal") || e == "btn") {
    emit("closeModal");
  }
}
</script>
<template>
  <div
    @click="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-30"
  >
    <div
      class="modal relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/4"
    >
      <button
        @click="closeModal('btn')"
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
      <div
        class="flex px-6 py-4 border-b border-solid rounded-t border-gray-300"
      >
        <h3
          class="mx-auto text-base font-semibold text-gray-900 lg:text-xl dark:text-white"
        >
          Following
        </h3>
      </div>
      <div
        class="flex w-full items-center justify-center border-b border-solid border-gray-300 font-bold text-gray-400 py-2"
      >
        <div
          @click="active = 'people'"
          :class="{
            'text-sky-900': active == 'people',
            'border-sky-600': active == 'people',
          }"
          class="mx-auto cursor-pointer"
        >
          People<span
            class="bg-gray-300 text-xs p-1 ml-1 rounded-xl"
            v-if="followingUser"
            >{{ followingUser.length }}</span
          >
        </div>
        <div
          @click="active = 'tags'"
          :class="{
            'text-sky-900': active == 'tags',
            'border-sky-600': active == 'tags',
          }"
          class="mx-auto cursor-pointer"
        >
          Tags
          <span
            class="bg-gray-300 text-xs p-1 ml-1 rounded-xl"
            v-if="followingTag"
            >{{ followingTag.length }}</span
          >
        </div>
      </div>
      <FollowingUser
        v-if="active == 'people'"
        :followingUser="followingUser"
        :userName="userName"
      ></FollowingUser>
      <FollowingTag
        v-if="active == 'tags'"
        :followingTag="followingTag"
        :userName="userName"
      ></FollowingTag>
    </div>
  </div>
</template>
