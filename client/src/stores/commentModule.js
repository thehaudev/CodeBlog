import { instance, instanceWithAccess } from "../configs/axios";

import { useStore } from "vuex";
const store = useStore();
const comments = {
  namespaced: true,
  state() {
    return {
      commentsInPost: null,
      paginationOfComments: {},
    };
  },
  getters: {
    getCommentsInPost(state) {
      return state.commentsInPost;
    },
    getPaginationOfComments(state) {
      return state.paginationOfComments;
    },
  },
  mutations: {
    setData: (state, data) => {
      state.commentsInPost = data.comments;
      state.paginationOfComments = data.pagination;
      state.current_page = data.pagination.current_page;
    },
  },
  actions: {
    async fetchData({ commit }, { postId }) {
      const comments = await instance.get("/posts/" + postId + "/comments", {
        params: {
          page: 1,
        },
      });
      commit("setData", comments.data.data);
    },
    async setCurrent_page({ commit }, { current_page, limit, postId }) {
      const comments = await instance.get("/posts/" + postId + "/comments", {
        params: {
          limit: limit,
          page: current_page,
        },
      });
      commit("setData", comments.data.data);
    },
  },
};
export default comments;
