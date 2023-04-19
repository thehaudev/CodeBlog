import instance from "../configs/axios";
import { useStore } from "vuex";
const store = useStore();
const postDetail = {
  namespaced: true,
  state() {
    return {
      post: null,
      isVote: null,
      isBookmark: false,
      isFollow: false,
      postsOfUser: null,
      relatedPosts: null,
    };
  },
  getters: {
    getPost(state) {
      return state.post;
    },
    getPostsOfUser(state) {
      return state.postsOfUser;
    },
    getRelatedPosts(state) {
      return state.relatedPosts;
    },
    isVote(state) {
      return state.isVote;
    },
    isBookmark(state) {
      return state.isBookmark;
    },
    isFollow(state) {
      return state.isFollow;
    },
  },
  mutations: {
    setData: (state, data) => {
      state.post = data.post;
    },
    setActive: (state, data) => {
      if (data.voteType) state.isVote = data.voteType;
      else state.isVote = null;
      if (data.isBookmark) state.isBookmark = true;
      else state.isBookmark = false;
      if (data.isFollow) state.isFollow = true;
      else state.isFollow = false;
    },
    setPostsOfUser: (state, data) => {
      state.postsOfUser = data;
    },
    setRelatedPosts: (state, data) => {
      state.relatedPosts = data;
    },
  },
  actions: {
    async fetchData({ commit }, { postId }) {
      const response = await instance.get("/posts/" + postId);
      const postsOfUser = await instance.get(
        "/users/" + response.data.post.user._id + "/posts"
      );
      const relatedPosts = await instance.get("/posts/" + postId + "/related");
      commit("setData", response.data);
      commit("setPostsOfUser", postsOfUser.data.posts);
      commit("setRelatedPosts", relatedPosts.data.posts);
    },
    async fetchActive({ commit, state }, { postId }) {
      if (localStorage.getItem("accessToken")) {
        const isVote = await instance.get("/vote_post/" + postId);
        const isBookmark = await instance.get("/bookmarks/" + postId);
        const isFollow = await instance.get("/follow_user/", {
          params: {
            userId: state.post.user._id,
          },
        });
        commit("setActive", {
          voteType: isVote.data.data?.type,
          isBookmark: isBookmark.data.data,
          isFollow: isFollow.data.data,
        });
      }
    },
    async addViews({ commit }, { postId, userId }) {
      await instance.post("/views", {
        postId: postId,
        userId: userId,
      });
    },
  },
};
export default postDetail;
