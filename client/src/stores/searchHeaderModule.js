import instance from "../configs/axios";

const search = {
  namespaced: true,
  state() {
    return {
      searchText: "",
    };
  },
  getters: {
    getSearchText(state) {
      return state.searchText;
    },
  },
  mutations: {
    setSearchText: (state, text) => {
      state.searchText = text;
    },
  },
  actions: {
    setSearchText({ commit }, { text }) {
      commit("setSearchText", text);
    },
  },
};
export default search;
