<script setup>
import Tabs from "../components/profile/Tabs.vue";
import Posts from "../components/profile/Posts.vue";
import Followers from "../components/profile/Followers.vue";
import Following from "../components/profile/Following.vue";

import BookmarkPosts from "../components/profile/BookmarkPosts.vue";
import FollowBtn from "../components/profile/FollowBtn.vue";
import skeletonLoader from "../components/skeletonLoader.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

const store = useStore();
const route = useRoute();
const modalFollowers = ref(false);
const modalFollowing = ref(false);

const selectTab = ref("posts");
const userId = route.params.id;

const me = computed(() => store.getters["auth/getUser"]);
const user = computed(() => store.getters["users/getUser"]);

async function emitTab(select) {
  selectTab.value = select;
}

async function fetchData() {
  await store.dispatch("users/setUser", { userId: userId });
}
onMounted(fetchData);
</script>
<template>
  <div class="w-full flex flex-row flex-wrap lg:w-8/12 mt-5 mx-auto">
    <div class="w-1/3 p-5 h-0 md:h-screen bg-white">
      <div class="flex flex-col justify-center pb-10" v-if="user">
        <img
          src="https://images.pexels.com/photos/3278968/pexels-photo-3278968.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          class="h-60 w-60 rounded-full object-cover mx-auto"
          alt="username"
        />

        <div class="ml-10">
          <div class="flex items-center">
            <h2 class="block leading-relaxed font-light text-gray-700 text-3xl">
              {{ user.display_name }}
            </h2>
            <FollowBtn
              @followSubmit="fetchData"
              :followUserId="user._id"
            ></FollowBtn>
            <a
              v-if="userId == me._id"
              class="cursor-pointer ml-2 p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
              aria-label="Notifications"
            >
              <svg
                class="h-8 w-8"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </div>
          <h2 class="block leading-relaxed font-light text-gray-700 text-3xl">
            @{{ user.email.split("@")[0] }}
          </h2>
          <ul class="flex justify-content-around items-center">
            <li>
              <span class="block text-base flex"
                ><span class="font-bold mr-2">{{ user.posts }} </span>
                Posts</span
              >
            </li>
            <li @click="modalFollowers = true">
              <span class="cursor-pointer block text-base flex ml-5"
                ><span class="font-bold mr-2"
                  >{{ user.followers.length }}
                </span>
                Followers</span
              >
            </li>
            <li @click="modalFollowing = true">
              <span class="cursor-pointer block text-base flex ml-5"
                ><span class="font-bold mr-2"
                  >{{ user.followingUser.length }}
                </span>
                following</span
              >
            </li>
          </ul>
          <br />
          <div class="">
            <h1 class="text-base font-bold font-light">Darcy</h1>
            <span class="text-base"
              >I am Darcy, I like music, and record videos</span
            >
            <a class="block text-base text-blue-500 mt-2" target="_blank"
              >https://tailwindcomponents.com/</a
            >
          </div>
        </div>
      </div>
      <skeletonLoader v-else></skeletonLoader>
    </div>

    <div class="w-2/3 p-1 md:px-12] lg:24 h-full antialiased">
      <tabs @selectTab="emitTab"></tabs>
      <Posts v-if="selectTab == 'posts'"> </Posts>
      <BookmarkPosts v-if="selectTab == 'bookmarks'"></BookmarkPosts>
    </div>
  </div>

  <Followers
    @closeModal="modalFollowers = false"
    :followers="user.followers"
    :userName="user.display_name"
    v-if="modalFollowers"
  ></Followers>
  <Following
    @closeModal="modalFollowing = false"
    :followingUser="user.followingUser"
    :followingTag="user.followingTag"
    :userName="user.display_name"
    v-if="modalFollowing"
  ></Following>
</template>
