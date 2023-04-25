<template>
  <div class="flex flex-col pt-10 pb-8 px-52">
    <div class="flex">
      <div
        class="border-2 border-blue-800 rounded-md shadow-md cursor-pointer border- h-36 w-36"
      >
        <img src="../assets/favicon/apple-icon-180x180.png" alt="" />
      </div>
      <div class="flex justify-between flex-grow px-4 py-2">
        <div class="">
          <div class="text-2xl font-bold">Đào Xuân Nhật Trường</div>
          <div class="text-xl text-gray-600">@truongdxn</div>
        </div>
        <div
          class="flex items-center justify-center gap-2 px-3 py-1 text-blue-800 border border-blue-800 border-solid rounded-md cursor-pointer w-fit h-fit hover:shadow-md hover:bg-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-pen"></i>
          Edit profile
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div class="flex gap-2 text-sm" v-if="isProfileTab">
        <div
          class="px-4 py-1 text-white bg-blue-800 rounded-full cursor-pointer"
        >
          Profile
        </div>
        <div
          class="px-4 py-1 rounded-full cursor-pointer hover:bg-gray-100"
          @click="this.changeTab()"
        >
          Setting
        </div>
      </div>
      <div class="flex gap-2 text-sm" v-else>
        <div
          class="px-4 py-1 rounded-full cursor-pointer hover:bg-gray-100"
          @click="this.changeTab()"
        >
          Profile
        </div>
        <div
          class="px-4 py-1 text-white bg-blue-800 rounded-full cursor-pointer"
        >
          Setting
        </div>
      </div>
    </div>
    <!-- profile tab -->
    <div v-if="isProfileTab" class="grid grid-cols-4 mt-6">
      <div class="flex flex-col pr-4">
        <div class="mb-2 text-xl">Stats</div>
        <div
          class="grid grid-cols-2 p-4 border border-gray-300 border-solid rounded-md"
        >
          <div class="flex flex-col">
            <div class="text-xl">1</div>
            <div class="text-gray-500">reputation</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xl">1</div>
            <div class="text-gray-500">reached</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xl">1</div>
            <div class="text-gray-500">answers</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xl">1</div>
            <div class="text-gray-500">question</div>
          </div>
        </div>
        <div class="mt-4 mb-2 text-xl">Social Accounts</div>
        <div class="p-4 border border-gray-300 border-solid rounded-md">
          <div
            class="flex items-center gap-2 text-gray-600 hover:text-blue-800"
          >
            <i class="fa-brands fa-github"></i>
            <span class="cursor-pointer hover:underline"> Github </span>
          </div>
          <div
            class="flex items-center gap-2 text-gray-600 hover:text-blue-800"
          >
            <i class="fa-brands fa-facebook"></i>
            <span class="cursor-pointer hover:underline"> Facebook </span>
          </div>
        </div>
        <div class="mt-4 mb-2 text-xl">Communities</div>
        <div class="p-4 border border-gray-300 border-solid rounded-md">
          <div class="flex gap-2">
            <div class="w-6 h-6">
              <img src="../assets/favicon/apple-icon-180x180.png" alt="" />
            </div>
            <div
              class="text-blue-800 cursor-pointer hover:underline hover:text-blue-600"
            >
              Code blogger 1
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col col-span-3 pl-4">
        <div class="mb-2 text-xl">About</div>
        <div class="text-gray-600">This is about part.</div>
        <div class="mt-4 mb-2 text-xl">Posts</div>
        <div
          class="flex flex-col gap-2 p-2 border border-gray-300 border-solid rounded-md"
        >
          <div class="flex items-center justify-between p-2 text-blue-800">
            <div class="flex items-center gap-2">
              <i class="text-gray-300 fa-solid fa-newspaper"></i>
              <div class="cursor-pointer hover:underline hover:text-blue-600">
                Post name 1
              </div>
            </div>
            <div class="text-sm text-gray-500">21 Jan, 2023</div>
          </div>
        </div>
      </div>
    </div>

    <!-- setting tab -->
    <div v-else class="grid grid-cols-5 mt-6">
      <div class="flex flex-col gap-1 pr-4 text-sm">
        <div class="pl-4 mb-1 text-sm font-semibold">PERSONAL INFORMATION</div>
        <div class="py-1 pl-4 text-white bg-blue-800 rounded-full cursor-pointer">Edit profile</div>
        <div class="py-1 pl-4 rounded-full cursor-pointer hover:bg-gray-300">Edit social accounts</div>
      </div>
      <div class="col-span-4 pl-4">
        <div class="pb-4 text-2xl border-b border-gray-300 border-solid">
          Edit your profile
        </div>
        <div class="flex flex-col">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // state
  data() {
    return {
      isProfileTab: true,
    };
  },
  // actions
  methods: {
    changeTab() {
      this.isProfileTab = !this.isProfileTab;
    },
  },
};
</script>
