<script setup>
import {
  computed,
  onUpdated,
  watchEffect,
  nextTick,
  ref,
  onMounted,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { URL_AVATAR } from "../constants/index";
import CommentEditor from "../components/CommentEditor.vue";
import Comment from "../components/Comment.vue";
import CarouselPosts from "../components/CarouselPosts.vue";
import { useVotePost } from "../composables/votePost";
import { useBookmark } from "../composables/bookmark";
import { useFollow } from "../composables/followUser";
import { getReadableDate, getTimeSincePost } from "../utils/time";
import postDetail from "../stores/postModule";
// import PostsSlick from "../components/PostsSlick.vue";
const { follow } = useFollow();
const { bookmark } = useBookmark();
const { votePost } = useVotePost();
const store = useStore();
const route = useRoute();
const router = useRouter();
const limit = ref(5);

//pagination comments
watch(limit, async () => {
  await store.dispatch("comments/setCurrent_page", {
    current_page: 1,
    limit: limit.value,
    postId: postId.value,
  });
});
window.addEventListener("scroll", (e) => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (
    scrollHeight <= scrollTop + clientHeight &&
    paginationOfComment.value.total > limit.value
  ) {
    if (paginationOfComment.value.total - limit.value < 5)
      limit.value += paginationOfComment.value.total - limit.value;
    else limit.value += 5;
  }
});

//cuộn đến comment khi ta click vào thông báo
const commentId = ref(route.query.commentId);
if (commentId.value) {
  onMounted(() => {
    const commentElement = document.getElementById(commentId.value);
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth" });
    }
  });
}

//lấy dữ liệu
const postId = ref(route.params.id);
const post = computed(() => store.getters["postDetail/getPost"]);
const user = computed(() => store.getters["auth/getUser"]);
const listComments = computed(
  () => store.getters["comments/getCommentsInPost"]
);
const paginationOfComment = computed(
  () => store.getters["comments/getPaginationOfComments"]
);
const listPostsOfUser = computed(
  () => store.getters["postDetail/getPostsOfUser"]
);
const listRelatedPosts = computed(
  () => store.getters["postDetail/getRelatedPosts"]
);
const isVote = computed(() => store.getters["postDetail/isVote"]);
const isBookmark = computed(() => store.getters["postDetail/isBookmark"]);
const isFollow = computed(() => store.getters["postDetail/isFollow"]);

//function event
async function setCommentPage(page) {
  await store.dispatch("comments/setCurrent_page", {
    current_page: page,
    limit: limit.value,
    postId: postId.value,
  });
}
async function followBtn(followingId) {
  if (user.value) {
    await follow(followingId);
    await store.dispatch("postDetail/fetchData", { postId: postId.value });
    await store.dispatch("postDetail/fetchActive", { postId: postId.value });
  } else {
    await store.dispatch("route/setRouteBeforeLogin", {
      route: route.name,
    });
    router.push({ name: "login", params: {} });
  }
}
async function vote(type) {
  if (user.value) {
    await votePost(postId.value, type);
    await store.dispatch("postDetail/fetchData", { postId: postId.value });
    await store.dispatch("postDetail/fetchActive", { postId: postId.value });
  } else {
    await store.dispatch("route/setRouteBeforeLogin", {
      route: route.name,
    });
    router.push({ name: "login", params: {} });
  }
}
async function bookmarkBtn() {
  if (user.value) {
    await bookmark(postId.value);
    await store.dispatch("postDetail/fetchData", { postId: postId.value });
    await store.dispatch("postDetail/fetchActive", { postId: postId.value });
  } else {
    await store.dispatch("route/setRouteBeforeLogin", {
      route: route.name,
    });
    router.push({ name: "login", params: {} });
  }
}

//Khởi tạo data lên store
const fetchData = async () => {
  await store.dispatch("postDetail/fetchData", { postId: postId.value });
  await store.dispatch("comments/fetchData", { postId: postId.value });
  if (user.value) {
    await store.dispatch("postDetail/fetchActive", { postId: postId.value });
    await store.dispatch("postDetail/addViews", {
      postId: postId.value,
      userId: user.value._id,
    });
  } else {
    await store.dispatch("postDetail/addViews", {
      postId: postId.value,
    });
  }
};
onMounted(fetchData);

const tableOfContent = ref(null);
onMounted(() => {
  const section = document.querySelector(".content section");
  if (section) {
    const headers = Array.from(section.querySelectorAll("h1, h2, h3")).map(
      (header, index) => {
        header.setAttribute("id", `newId${index}`);
        return {
          id: header.id,
          tag: header.tagName.toLowerCase(),
          text: header.textContent,
        };
      }
    );
    tableOfContent.value = headers;
  }
});
//theo thõi trên trang tính
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    if (entry.intersectionRatio > 0) {
      document
        .querySelector(`nav ol li a[href="#${id}"]`)
        .parentElement.classList.add("active");
    } else {
      document
        .querySelector(`nav ol li a[href="#${id}"]`)
        .parentElement.classList.remove("active");
    }
  });
});

onMounted(() => {
  document.querySelectorAll("h1[id],h2[id],h3[id]").forEach((section) => {
    observer.observe(section);
  });
});
</script>

<template>
  <!-- list posts of user  -->
  <!-- <PostsSlick :items="listPostsOfUser"></PostsSlick> -->
  <main v-if="post">
    <div class="post-active">
      <!-- <div class="w-16">
        <img :src="URL_AVATAR + post.user.avatar" alt="avatar" />
      </div> -->
      <div class="vote">
        <i
          title="Upvote"
          class="fa-solid fa-caret-up"
          :class="{ active: isVote == 'Upvote' }"
          @click="vote('Upvote')"
        ></i>
        <span>{{ post.votes }}</span>
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
    <div class="container">
      <div class="post">
        <div class="content-header">
          <div class="profile">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div
                  class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
                >
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    :src="URL_AVATAR + post.user.avatar"
                    :alt="post.user.display_name"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                      >{{ post.user.display_name }}</a
                    >
                    <p
                      class="text-base font-light text-gray-500 dark:text-gray-400"
                    >
                      @{{ post.user.email.split("@")[0] }}
                    </p>
                    <p
                      class="text-base font-light text-gray-500 dark:text-gray-400"
                    >
                      <time pubdate :title="getReadableDate(post.updatedAt)">{{
                        getReadableDate(post.updatedAt)
                      }}</time>
                    </p>
                  </div>
                </div>
              </address>
              <h1
                class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
              >
                {{ post.title }}
              </h1>
            </header>
            <!-- <div class="top">
              <div class="user item-center">
                <p class="username">{{ post.user.display_name }}</p>
                <p class="email ml-1 mr-1 text-gray-400">
                  @{{ post.user.email.split("@")[0] }}
                </p>
                <button
                  @click="followBtn(post.user._id)"
                  class="follow"
                  :class="{ active: isFollow }"
                >
                  {{ isFollow ? "Following" : "Follow" }}
                </button>
              </div>
              <span>{{ getReadableDate(post.updatedAt) }}</span>
            </div> -->
            <div class="bottom">
              <p>
                <i class="fa-solid fa-user-plus"></i>
                <span>{{ post.followers }}</span>
              </p>
              <p>
                <i class="fa-solid fa-pencil"></i><span>{{ post.posts }}</span>
              </p>

              <p>
                <i class="fa-regular fa-eye"></i><span>{{ post.views }}</span>
              </p>
              <p>
                <i class="fa-regular fa-comments"></i
                ><span>{{ post.comments }}</span>
              </p>
              <p><i class="fa-solid fa-bookmark"></i>{{ post.bookmarks }}</p>
            </div>
          </div>
        </div>

        <div class="content">
          <ul class="tags">
            <li v-for="tag in post.tags" :key="tag._id">{{ tag.title }}</li>
          </ul>
          <section id="content" v-html="post.content"></section>
        </div>
      </div>

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion (20)
        </h2>
      </div>
      <CommentEditor
        :inReplyToComment="null"
        :inReplyToUser="null"
      ></CommentEditor>
      <div v-if="listComments">
        <Comment
          v-for="comment in listComments"
          :key="comment._id"
          :comment="comment"
          :id="comment._id"
        ></Comment>
      </div>

      <ul
        v-if="paginationOfComment && listComments && listComments.length"
        class="pagination"
      >
        <li href="#">&laquo;</li>
        <li
          v-for="n in paginationOfComment.total_pages"
          @click="setCommentPage(n)"
          :key="n"
          :class="{ active: paginationOfComment.current_page == n }"
          href="#"
        >
          {{ n }}
        </li>
        <li href="#">&raquo;</li>
      </ul>
    </div>
    <nav class="section-nav">
      <!-- mục lục -->
      <ol class="table">
        <li v-for="li in tableOfContent" :key="li.id">
          <a :href="'#' + li.id">{{ li.text }}</a>
        </li>
      </ol>

      <!-- các bài viết liên quan -->
      <h1 class="text-lg mt-3">Related posts</h1>

      <ul class="mt-1">
        <li v-for="post in listRelatedPosts" :key="post._id" class="">
          <router-link :to="{ name: 'postDetail', params: { id: post._id } }"
            ><span
              >{{ post.votes
              }}<i class="fa-solid fa-star" style="color: #e7e013"></i></span
            >{{ post.title }}</router-link
          >
        </li>
      </ul>
      <!-- các bài viết cùng tác giả -->
      <h1 class="text-lg mt-3">Posts of author</h1>
      <ul class="mt-1">
        <li v-for="post in listPostsOfUser" :key="post._id">
          <router-link :to="{ name: 'postDetail', params: { id: post._id } }"
            ><span
              >{{ post.votes
              }}<i class="fa-solid fa-star" style="color: #e7e013"></i></span
            >{{ post.title }}</router-link
          >
        </li>
      </ul>
    </nav>
  </main>
</template>
<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 15%;
}
main .post-active {
  width: 10%;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
main .post-active i {
  cursor: pointer;
}

main > nav {
  position: sticky;
  top: 5rem;
  align-self: start;
}

/* 3. ScrollSpy active styles (see JS tab for activation) */
.section-nav .table li.active > a {
  color: #333;
  font-weight: 500;
}

/* Sidebar Navigation */
.section-nav {
  padding-left: 10px;
  border-left: 1px solid #efefef;
}

.section-nav .table a {
  text-decoration: none;
  display: block;
  padding: 0.125rem 0;
  color: #ccc;
  transition: all 50ms ease-in-out; /* 💡 This small transition makes setting of the active state smooth */
}

.section-nav .table a:hover,
.section-nav .table a:focus {
  color: #666;
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px 0 0;
}

.follow {
  border: 1px solid #0e5dc5;
  padding: 3px 10px;
  border-radius: 5px;
}
.follow:hover {
  background-color: #0e5dc5;
}

.post .title {
  font-size: 24px;
  font-weight: bold;
}

.profile {
  display: flex;
  flex-direction: column;
}
.profile .top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.profile .top .user {
  display: flex;
  flex-direction: row;
  align-items: space-around;
}
.profile .bottom {
  display: flex;
}
.tags {
  display: flex;
  justify-content: flex-start;
}
.tags > li {
  padding: 3px 10px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0 2px;
}
.action {
  display: flex;
  justify-content: flex-start;
}
.profile .active {
  background-color: #0e5dc5;
}
.vote .active {
  color: black;
}

.pagination {
  margin: 10px auto;
  display: inline-block;
}

.pagination li {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
}

.pagination li.active {
  background-color: #4caf50;
  color: white;
}
.mt-1 {
  color: #2183d1;
}
</style>
