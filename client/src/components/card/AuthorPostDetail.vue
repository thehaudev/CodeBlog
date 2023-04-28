<script setup>
import { onMounted, computed, ref } from "vue";
import { URL_AVATAR } from "../../constants/index";
import { useStore } from "vuex";
import FollowBtn from "../profile/FollowBtn.vue";

const props = defineProps(["authorId"]);
const author = computed(() => store.getters["users/getUser"]);
const store = useStore();
async function fetchData() {
  await store.dispatch("users/setUser", { userId: props.authorId });
}
onMounted(fetchData);
</script>
<template>
  <div
    v-if="author"
    class="max-w-md z-40 p-3 shadow-lg rounded-lg sm:flex sm:space-x-6 bg-gray-50 absolute text-gray-800 left-14 -bottom-20"
  >
    <div class="flex-shrink-0 w-12 mb-6 h-12 sm:h-28 sm:w-28 sm:mb-0">
      <img
        :src="URL_AVATAR + author.avatar"
        :alt="author.display_name"
        class="object-cover object-center w-full h-full rounded bg-gray-500"
      />
    </div>
    <div class="flex flex-col space-y-4">
      <div>
        <h2 class="text-2xl font-semibold">
          <router-link
            :to="{
              name: 'profile',
              params: {
                id: author._id,
              },
            }"
            >{{ author.display_name }}</router-link
          >
        </h2>
        <span class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            aria-label="Email address"
            class="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
            ></path>
          </svg>
          <span class="text-gray-600">{{ author.email }}</span>
        </span>
        <div class="flex flex-row justify-center text-gray-600">
          <p class="mr-1">{{ author.posts }} posts</p>
          <p class="mr-1">{{ author.followers.length }} followers</p>
          <p class="mr-1">{{ author.followingUser.length }} following</p>
        </div>
        <FollowBtn :followUserId="author._id"></FollowBtn>
      </div>
    </div>
  </div>
</template>
