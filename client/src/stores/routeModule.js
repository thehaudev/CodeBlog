const route = {
  namespaced: true,
  state() {
    return {
      beforeLogin: null,
      showModalLogin: false,
      showModalRefresh: false,
    };
  },
  getters: {
    getRouteBeforeLogin(state) {
      return state.beforeLogin;
    },
    getShowModalLogin(state) {
      return state.showModalLogin;
    },
    getShowModalRefresh(state) {
      return state.showModalRefresh;
    },
  },
  mutations: {
    setRouteBeforeLogin: (state, data) => {
      state.beforeLogin = data;
    },
    setShowModalLogin: (state, data) => {
      state.showModalLogin = data;
    },
    setShowModalRefresh: (state, data) => {
      state.showModalRefresh = data;
    },
  },
  actions: {
    setRouteBeforeLogin({ commit }, { route, path }) {
      commit("setRouteBeforeLogin", path);
    },
    setShowModalLogin({ commit }, { isShow }) {
      commit("setShowModalLogin", isShow);
    },
    setShowModalRefresh({ commit }, { isShow }) {
      commit("setShowModalRefresh", isShow);
    },
  },
};
export default route;
