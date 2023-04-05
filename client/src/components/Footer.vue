<template>
  <div
    class="mt-6 w-full bg-blue-800 text-white pt-6 pb-10 px-6 border-solid border-t-4 border-blue-600"
  >
    <div class="container flex justify-around mx-auto">
      <div class="w-3/12 flex flex-col items-center p-3">
        <div class="bg-white px-5 py-3 rounded-full flex items-end mb-2">
          <div id="logo" class="relative">
            <div class="rounded-full bg-blue-600 h-10 w-10"></div>
            <div
              class="rounded-full bg-white h-5 w-5 absolute bottom-1 right-1"
            ></div>
          </div>
          <div class="text-gray-800 font-semibold font-serif text-2xl ml-2">
            codeBlog
          </div>
        </div>
        <div class="text-md font-semibold">© Since 2023</div>
      </div>
      <div class="w-2/12 p-3">
        <ul class="flex flex-col text-md">
          <li class="hover:text-blue-100 px-2 py-1"><a href="#">● About</a></li>
          <li class="hover:text-blue-100 px-2 py-1">
            <a href="#">● Products</a>
          </li>
          <li class="hover:text-blue-100 px-2 py-1">
            <a href="#">● For Teams</a>
          </li>
        </ul>
      </div>
      <div id="contacts" class="w-3/12 p-3">
        <div class="font-serif font-bold text-lg">Contact Us</div>
        <div class="">
          <i class="fa-sharp fa-solid fa-envelope mr-1"></i>
          {{ mail }}
        </div>
        <div class="">
          <i class="fa-solid fa-phone-volume mr-1"></i>
          {{ phone }}
        </div>
      </div>
      <div id="follow" class="w-2/12 p-3">
        <div class="font-serif font-bold text-lg">Follow Us</div>
        <div class="flex gap-3 text-white">
          <a
            href="#"
            class="text-4xl rounded-md flex content-center items-center h-12 w-13 hover:scale-110"
          >
            <i class="fa-brands fa-github"></i>
          </a>
          <a
            href="#"
            class="text-4xl rounded-md flex content-center items-center h-12 w-13 hover:scale-110"
          >
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a
            href="#"
            class="text-4xl rounded-md flex content-center items-center h-12 w-13 hover:scale-110"
          >
            <i class="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const mail = ref("contact@codeblog.com");
const phone = ref("+84 848 484 8484");
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
</style>
