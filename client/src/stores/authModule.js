import instance from "../configs/axios";
import socket from "../plugins/socket";

const auth = {
  namespaced: true,
  state() {
    return {
      user: null,
      tagsFollowing: null,
      usersFollowing: null,
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getTagsFollowing(state) {
      return state.tagsFollowing;
    },
    getUsersFollowing(state) {
      return state.usersFollowing;
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setTagsFollowing: (state, data) => {
      state.tagsFollowing = data;
    },
    setUserFollowing: (state, data) => {
      state.usersFollowing = data;
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
