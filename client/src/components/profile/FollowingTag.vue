<script setup>
import FollowTagBtn from "./FollowTagBtn.vue";
import { URL_AVATAR } from "../../constants";

const props = defineProps(["followingTag", "userName"]);
</script>
<template>
  <div>
    <ul
      v-if="followingTag.length != 0"
      role="list"
      class="p-6 divide-y divide-slate-200 max-h-96 overflow-auto"
    >
      <li
        v-for="follow in followingTag"
        :key="follow.tag._id"
        class="flex py-4 first:pt-0 last:pb-0"
      >
        <!-- <img
          class="h-10 w-10 rounded-full"
          :src="URL_AVATAR + author.user.avatar"
          :alt="author.user.display_name"
        /> -->
        <div class="ml-3 overflow-hidden">
          <router-link
            :to="{ name: 'postsTagged', params: { id: follow.tag._id } }"
          >
            <p class="text-sm font-medium text-slate-900">
              #{{ follow.tag.title }}
            </p>
          </router-link>
        </div>

        <FollowTagBtn
          class="absolute right-3"
          :followTagId="follow.tag._id"
        ></FollowTagBtn>
      </li>
    </ul>
    <div v-else class="flex flex-col items-center p-4">
      <span class="text-9xl p-10 rounded-full border border-gray-500">#</span>
      <p>
        <span class="font-bold">{{ userName }} </span> isn't currently following
        any tags.
      </p>
    </div>
  </div>
</template>
