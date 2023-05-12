<script setup>
import FollowBtn from "../profile/FollowBtn.vue";

import { URL_AVATAR } from "../../constants";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const props = defineProps(["author", "page", "search"]);
async function fetchData() {
  await store.dispatch("users/filterUser", {
    sort: "follower",
    current_page: props.page,
    search: props.search,
  });
}
</script>

<template>
  <!-- Card -->
  <div
    class="max-w-sm w-72 bg-white shadow-lg rounded-sm border border-gray-200 m-1"
  >
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="flex-grow p-5">
        <div class="flex justify-between items-start">
          <header>
            <div class="flex items-center mb-2">
              <img
                :src="URL_AVATAR + author.avatar"
                class="w-14 h-14 border rounded-full bg-gray-500 border-gray-300 mr-3"
                :alt="author.display_name"
              />
              <div class="mt-1 pr-1">
                <a
                  class="inline-flex text-gray-800 hover:text-gray-900"
                  href="#0"
                >
                  <h2 class="text-xl leading-snug justify-center font-semibold">
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
                </a>
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-400 -mt-0.5 mr-1"
                    >@ {{ author.email.split("@")[0] }}</span
                  >
                </div>
                <FollowBtn
                  class="mt-3"
                  @followSubmit="fetchData"
                  :followUserId="author._id"
                ></FollowBtn>
              </div>
            </div>
          </header>

          <!-- Menu button -->
        </div>
        <!-- Bio -->
        <div v-if="author.about" class="mt-2 paragraph">
          <div class="text-sm">
            {{ author.about }}
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200">
        <div class="flex divide-x divide-gray-200r">
          <div
            class="pb-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid"
          >
            <span class="text-center px-2"
              ><span class="font-bold text-gray-700">{{
                author.followers
              }}</span
              ><span class="text-gray-600"> followers</span></span
            ><span class="text-center px-2"
              ><span class="font-bold text-gray-700">{{ author.posts }}</span
              ><span class="text-gray-600"> posts</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.paragraph {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
