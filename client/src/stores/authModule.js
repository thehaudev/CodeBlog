import { instance, instanceWithAccess } from "../configs/axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const auth = {
  namespaced: true,
  state() {
    return {
      isLoggedIn: false,
      user: null,
      tagsFollowing: null,
      usersFollowing: null,
      userBookmarks: null,
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
    getUserBookmarks(state) {
      return state.userBookmarks;
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
    setUserBookmarks: (state, data) => {
      state.userBookmarks = data;
    },
  },
  actions: {
    setUserToken({ commit }, { user }) {
      commit("setUser", user);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
    },

    async setTagsFollowing({ commit }) {
      const res = await instanceWithAccess.get("/users/me/tagsFollowing");
      commit("setTagsFollowing", res.data.data);
    },
    async setUsersFollowing({ commit }) {
      const res = await instanceWithAccess.get("/users/me/usersFollowing");
      commit("setUserFollowing", res.data.data);
    },
    async setUserBookmarks({ commit }) {
      const res = await instanceWithAccess.get("/users/me/bookmarks");
      commit("setUserBookmarks", res.data.data);
    },
    async setUserImages({ commit }) {
      const res = await instanceWithAccess.get("/images/me");
      commit("setUserImages", res.data.data);
    },
    async logout({ commit }) {
      commit("setUser", null);
      localStorage.removeItem("user");
      localStorage.removeItem("socketConnection");
      await instanceWithAccess.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiration");
      cookies.remove("RefreshToken");
    },
  },
};
export default auth;
