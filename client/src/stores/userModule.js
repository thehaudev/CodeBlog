import { instance, instanceWithAccess } from "../configs/axios";

const users = {
  namespaced: true,
  state() {
    return {
      listUsers: [],
      pagination: null,
      usersShowInHome: null,
      user: null,
    };
  },
  getters: {
    getAllUsers(state) {
      return state.listUsers;
    },
    getPagination(state) {
      return state.pagination;
    },
    getUsersShowInHome(state) {
      return state.usersShowInHome;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setData: (state, listUsers) => {
      state.listUsers = listUsers.data;
      state.pagination = listUsers.pagination;
    },
    setUsersShowInHome: (state, listUsers) => {
      state.usersShowInHome = listUsers.data;
    },
    setUser: (state, data) => {
      state.user = data.data;
    },
  },
  actions: {
    async filterUser({ commit }, { current_page, sort, search, limit = 9 }) {
      const response = await instance.get("/users", {
        params: {
          limit: limit,
          sort: sort,
          page: current_page,
          search: search,
        },
      });
      commit("setData", response.data);
    },
    async filterUsersShowInHome(
      { commit },
      { current_page, sort, search, limit = 9 }
    ) {
      const response = await instance.get("/users", {
        params: {
          limit: limit,
          sort: sort,
          page: current_page,
          search: search,
        },
      });
      commit("setUsersShowInHome", response.data);
    },
    async follow({ commit }, { userId }) {
      const res = await instanceWithAccess.get("/follow_user/", {
        params: {
          userId: userId,
        },
      });
      if (res.data.data) {
        await instanceWithAccess.delete("/follow_user", {
          data: {
            userId: userId,
          },
        });
      } else {
        await instanceWithAccess.post("/follow_user", {
          userId: userId,
        });
      }
    },
    async setUser({ commit }, { userId }) {
      const res = await instance.get("/users/" + userId);
      commit("setUser", res.data);
    },
  },
};
export default users;
