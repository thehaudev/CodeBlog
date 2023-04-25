<script setup>
import FollowBtn from "./FollowBtn.vue";
import { URL_AVATAR } from "../../constants";

const props = defineProps(["followers", "userName"]);
const emit = defineEmits(["closeModal"]);
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
          Followers
        </h3>
      </div>
      <div v-if="followers.length != 0">
        <ul
          role="list"
          class="p-6 divide-y divide-slate-200 max-h-96 overflow-auto"
        >
          <li
            v-for="follower in followers"
            :key="follower.user._id"
            class="flex justify-between py-4 first:pt-0 last:pb-0"
          >
            <div class="flex first:pt-0 last:pb-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="URL_AVATAR + follower.user.avatar"
                :alt="follower.user.display_name"
              />
              <div class="ml-3 overflow-hidden">
                <router-link
                  :to="{ name: 'profile', params: { id: follower.user._id } }"
                >
                  <p class="text-sm font-medium text-slate-900">
                    {{ follower.user.display_name }}
                  </p>
                  <p class="text-sm text-slate-500 truncate">
                    {{ follower.user.email }}
                  </p>
                </router-link>
              </div>
            </div>

            <FollowBtn
              class="right-6"
              :followUserId="follower.user._id"
            ></FollowBtn>
          </li>
        </ul>
      </div>
      <div v-else class="flex flex-col items-center p-4">
        <span class="text-9xl p-10 rounded-full border border-gray-500">#</span>
        <p>
          <span class="font-bold">{{ userName }} </span> doesn't have any
          followers.
        </p>
      </div>
    </div>
  </div>
</template>
