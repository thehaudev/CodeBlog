<script setup>
import { URL_AVATAR } from "../../constants";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const props = defineProps(["author"]);
const usersFollowing = computed(
  () => (user.value && store.getters["auth/getUsersFollowing"]) || []
);
function checkFollowUser(id) {
  return usersFollowing.value.some((e) => e.userId == id);
}
const user = computed(() => store.getters["auth/getUser"]);

async function followUser(userId) {
  if (user.value) {
    await store.dispatch("users/follow", { userId: userId });
    await store.dispatch("auth/setUsersFollowing");
    await store.dispatch("users/filterUser", {
      sort: "follower",

      current_page: page.value,
      search: search.value,
    });
  } else {
    await store.dispatch("route/setRouteBeforeLogin", {
      path: route.path,
    });
    router.push({ name: "login", params: {} });
  }
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
          <!-- Image + name -->
          <header>
            <div class="flex mb-2">
              <a class="relative inline-flex items-start mr-5" href="#0">
                <div
                  class="absolute top-0 right-2 -mr-2 bg-white rounded-full shadow"
                  aria-hidden="true"
                >
                  <svg
                    class="w-5 h-5 fill-current text-green-500"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                    />
                  </svg>
                </div>
                <div
                  class="absolute top-0 right-2 -mr-2 bg-white rounded-full shadow"
                  aria-hidden="true"
                >
                  <svg
                    class="w-5 h-5 fill-current text-green-500"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                    />
                  </svg>
                </div>
                <img
                  class="rounded-full"
                  :src="URL_AVATAR + author.avatar"
                  width="64"
                  height="64"
                  :alt="author.display_name"
                />
              </a>
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
