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
    setVote: (state, data) => {
      if (data.voteType) state.isVote = data.voteType;
      else state.isVote = null;
    },
    setBookmark: (state, data) => {
      if (data.isBookmark) state.isBookmark = true;
      else state.isBookmark = false;
    },
    setFollow: (state, data) => {
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
    async fetchVote({ commit, state }, { postId }) {
      if (localStorage.getItem("accessToken")) {
        const isVote = await instance.get("/vote_post/" + postId);
        commit("setVote", {
          voteType: isVote.data.data?.type,
        });
      }
    },
    async fetchBookmark({ commit, state }, { postId }) {
      if (localStorage.getItem("accessToken")) {
        const isBookmark = await instance.get("/bookmarks/" + postId);
        commit("setBookmark", {
          isBookmark: isBookmark.data.data,
        });
      }
    },
    async fetchFollow({ commit, state }, { postId }) {
      if (localStorage.getItem("accessToken")) {
        const isFollow = await instance.get("/follow_user/", {
          params: {
            userId: state.post.user._id,
          },
        });
        commit("setFollow", {
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
