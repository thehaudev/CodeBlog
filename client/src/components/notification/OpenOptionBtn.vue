<script setup>
import { ref } from "vue";

const isShow = ref(false);
const props = defineProps(["notification"]);
</script>
<template>
  <div class="absolute right-0 top-1" @mouseleave="isShow = false">
    <button
      @click="isShow = true"
      class="absolute rounded-full right-0 top-0 inline-flex p-2 text-sm font-medium text-center text-gray-300 bg-white hover:bg-gray-100 dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
        ></path>
      </svg>
    </button>

    <div
      v-if="isShow"
      class="relative right-3 top-7 z-10 bg-white divide-y divide-gray-100 rounded-lg w-44 dark:bg-gray-700 dark:divide-gray-600 shadow-md"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <li>
          <span
            v-if="notification.isRead"
            @click="$emit('updateNoti', notification._id, false)"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Mark as unread
          </span>
          <span
            v-else
            @click="$emit('updateNoti', notification._id, true)"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Mark as read
          </span>
        </li>
        <li>
          <span
            @click="$emit('updateNoti', notification._id, true, false)"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Remove this notification
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
