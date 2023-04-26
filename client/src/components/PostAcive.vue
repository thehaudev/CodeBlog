<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { useVotePost } from "../composables/votePost";
import { useBookmark } from "../composables/bookmark";

import { useFollow } from "../composables/followUser";

const store = useStore();
const route = useRoute();
const router = useRouter();

const { follow } = useFollow();
const { bookmark } = useBookmark();
const { votePost } = useVotePost();
const isVote = computed(() => store.getters["postDetail/isVote"]);
const isBookmark = computed(() => store.getters["postDetail/isBookmark"]);
const user = computed(() => store.getters["auth/getUser"]);
const postId = ref(route.params.id);

const props = defineProps(["votes"]);

const votes = computed(() => props.votes);

async function vote(type) {
  if (user.value) {
    await votePost(postId.value, type);
    await store.dispatch("postDetail/fetchVote", { postId: postId.value });
    await store.dispatch("postDetail/fetchData", { postId: postId.value });
  } else {
    await store.dispatch("route/setShowModalLogin", {
      isShow: true,
    });
  }
}
async function bookmarkBtn() {
  if (user.value) {
    await bookmark(postId.value);
    await store.dispatch("postDetail/fetchBookmark", { postId: postId.value });
  } else {
    await store.dispatch("route/setShowModalLogin", {
      isShow: true,
    });
  }
}
</script>
<template>
  <main class="w-2/12 left-0 sticky top-9">
    <div class="post-active">
      <div class="vote">
        <i
          title="Upvote"
          class="fa-solid fa-caret-up"
          :class="{ active: isVote == 'Upvote' }"
          @click="vote('Upvote')"
        ></i>
        <span>{{ votes }}</span>
        <i
          title="Downvote"
          class="fa-solid fa-caret-down"
          :class="{ active: isVote == 'Downvote' }"
          @click="vote('Downvote')"
        ></i>
      </div>
      <div @click="bookmarkBtn()" title="Bookmarks this post" class="bookmark">
        <i v-if="isBookmark" class="fa-solid fa-bookmark"></i
        ><i v-else class="fa-regular fa-bookmark"></i>
      </div>
      <div title="Share a link to post on facebook" class="share mt-3">
        <i class="fa-brands fa-facebook-f"></i>
      </div>
    </div>
  </main>
</template>
<style scoped>
.post-active {
  width: 10%;
  top: 50px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
}
.post-active i {
  cursor: pointer;
}
.post-active .bookmark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgb(14, 93, 197);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(14, 93, 197);
  font-size: 24px;
}
.post-active .vote {
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: gray;
}

.post-active .share {
  border: 0.5px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 30px;
  height: 30px;
}

.post-active .vote i:hover {
  color: black;
}
.post-active .vote span {
  color: black;
  font-size: 2rem;
}
.vote .active {
  color: black;
}
</style>
