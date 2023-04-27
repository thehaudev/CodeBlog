<script setup>
import FormEditProfile from "../components/settings/FormEditProfile.vue";
import FormChangePassword from "../components/settings/FormChangePassword.vue";

import { useStore } from "vuex";
import { computed, ref } from "vue";
import { URL_AVATAR } from "../constants";

const store = useStore();

const user = computed(() => store.getters["auth/getUser"]);

const active = ref("edit-profile");
</script>

<template>
  <div
    v-if="user"
    class="w-full flex flex-col flex-wrap lg:w-6/12 mt-5 mx-auto"
  >
    <div class="grid grid-cols-5 mt-6">
      <div class="flex flex-col gap-1 pr-4 text-sm">
        <div class="flex flex-col items-center">
          <div
            class="border-2 border-blue-800 rounded-md shadow-md cursor-pointer border- h-36 w-36"
          >
            <img
              class="rounded w-36 h-36"
              :src="URL_AVATAR + user.avatar"
              :alt="user.display_name"
            />
          </div>
          <div class="flex justify-between flex-grow px-4 py-2">
            <div class="">
              <div class="text-2xl font-bold">{{ user.display_name }}</div>
              <div class="text-xl text-gray-600">
                @{{ user.email.split("@")[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="pl-4 mb-1 text-sm font-semibold">PERSONAL INFORMATION</div>
        <div
          @click="active = 'edit-profile'"
          :class="{
            'text-white': active == 'edit-profile',
            'bg-blue-800': active == 'edit-profile',
          }"
          class="py-1 pl-4 rounded-full cursor-pointer hover:bg-gray-300"
        >
          Edit profile
        </div>
        <div class="py-1 pl-4 rounded-full cursor-pointer hover:bg-gray-300">
          Edit social accounts
        </div>
        <div class="pl-4 mb-1 text-sm font-semibold">ACCESS</div>
        <div
          @click="active = 'change-password'"
          :class="{
            'text-white': active == 'change-password',
            'bg-blue-800': active == 'change-password',
          }"
          class="py-1 pl-4 hover:bg-gray-300 rounded-full cursor-pointer"
        >
          Change password
        </div>
      </div>
      <div class="col-span-4 pl-4">
        <FormEditProfile v-if="active == 'edit-profile'"></FormEditProfile>
        <FormChangePassword
          v-if="active == 'change-password'"
        ></FormChangePassword>
      </div>
    </div>
  </div>
</template>
