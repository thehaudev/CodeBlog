<script setup>
const props = defineProps(["user"]);
</script>
<template>
  <div class="w-full max-w-full lg-max:mt-6 mb-4 mt-4">
    <div
      class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border"
    >
      <!-- <div class="pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
        <div class="flex flex-wrap -mx-3">
          <div
            class="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none"
          >
            <a
              href="javascript:;"
              data-target="tooltip_trigger"
              data-placement="top"
            >
              <i
                class="leading-normal fas fa-user-edit text-size-sm text-slate-400"
                aria-hidden="true"
              ></i>
            </a>
            <div
              data-target="tooltip"
              class="px-2 py-1 text-center text-white bg-black rounded-lg text-size-sm hidden"
              role="tooltip"
              data-popper-placement="top"
              style="
                position: absolute;
                inset: auto auto 0px 0px;
                margin: 0px;
                transform: translate3d(869.5px, -417.5px, 0px);
              "
            >
              Edit Profile
              <div
                class="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                data-popper-arrow=""
                style="
                  position: absolute;
                  left: 0px;
                  transform: translate3d(0px, 0px, 0px);
                "
              ></div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="flex-auto">
        <p class="leading-normal text-size-sm">{{ user.about || "" }}</p>
        <hr class="h-px my-6 bg-transparent bg-gradient-horizontal-light" />
        <ul class="flex flex-col pl-0 mb-0 rounded-lg">
          <li
            class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit"
          >
            <strong class="text-slate-700">Email:</strong> &nbsp;
            {{ user.email }}
          </li>
          <li
            class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit"
          >
            <strong class="text-slate-700">Bio:</strong> &nbsp;
            {{ user.bio || "" }}
          </li>
          <li
            class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit"
          >
            <strong class="text-slate-700">Location:</strong> &nbsp;
            {{ user.location || "" }}
          </li>
          <li
            class="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit"
          >
            <strong class="leading-normal text-size-sm text-slate-700"
              >Social:</strong
            >
            &nbsp;
            <a
              class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in bg-none"
              href="javascript:;"
            >
              <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
            </a>
            <a
              class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in bg-none text-sky-600"
              href="javascript:;"
            >
              <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
            </a>
            <a
              class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in bg-none text-sky-900"
              href="javascript:;"
            >
              <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
