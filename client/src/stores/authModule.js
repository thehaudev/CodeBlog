import instance from "../configs/axios";
import socket from "../plugins/socket";

const auth = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      user: null,
      tagsFollowing: null,
      usersFollowing: null,
      userImages: [],
    };
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
    getTagsFollowing(state) {
      return state.tagsFollowing;
    },
    getUsersFollowing(state) {
      return state.usersFollowing;
    },
    getUserImages(state) {
      return state.userImages;
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
      state.isLoggedIn = true;
    },
    setTagsFollowing: (state, data) => {
      state.tagsFollowing = data;
    },
    setUserFollowing: (state, data) => {
      state.usersFollowing = data;
    },
    setUserImages: (state, data) => {
      state.userImages = data;
    },
  },
  actions: {
    setUserToken({ commit }, { user }) {
      commit("setUser", user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    async setTagsFollowing({ commit }) {
      const res = await instance.get("/users/me/tagsFollowing");
      commit("setTagsFollowing", res.data.data);
    },
    async setUsersFollowing({ commit }) {
      const res = await instance.get("/users/me/usersFollowing");
      commit("setUserFollowing", res.data.data);
    },
    async setUserImages({ commit }) {
      const res = await instance.get("/images/me");
      commit("setUserImages", res.data.data);
    },
    async logout({ commit }) {
      await instance.post("/auth/logout");
      commit("setUser", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("socketConnection");
    },
  },
};
export default auth;
