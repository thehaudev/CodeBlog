<script setup>
import FollowBtn from "./FollowBtn.vue";
import { URL_AVATAR } from "../../constants";

const props = defineProps(["followingUser", "userName"]);
</script>
<template>
  <div>
    <ul
      v-if="followingUser.length != 0"
      role="list"
      class="p-6 divide-y divide-slate-200 max-h-96 overflow-auto"
    >
      <li
        v-for="author in followingUser"
        :key="author.user._id"
        class="flex justify-between py-4 first:pt-0 last:pb-0"
      >
        <div class="flex">
          <img
            class="h-10 w-10 rounded-full"
            :src="URL_AVATAR + author.user.avatar"
            :alt="author.user.display_name"
          />
          <div class="ml-3 overflow-hidden">
            <router-link
              :to="{ name: 'profile', params: { id: author.user._id } }"
            >
              <p class="text-sm font-medium text-slate-900">
                {{ author.user.display_name }}
              </p>
              <p class="text-sm text-slate-500 truncate">
                {{ author.user.email }}
              </p>
            </router-link>
          </div>
        </div>

        <FollowBtn :followUserId="author.user._id"></FollowBtn>
      </li>
    </ul>
    <div v-else class="flex flex-col items-center p-4">
      <span class="text-9xl p-10 rounded-full border border-gray-500">#</span>
      <p>
        <span class="font-bold">{{ userName }} </span> isn't currently following
        any user.
      </p>
    </div>
  </div>
</template>
