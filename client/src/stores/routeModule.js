const route = {
  namespaced: true,
  state() {
    return {
      beforeLogin: null,
      showModalLogin: false,
    };
  },
  getters: {
    getRouteBeforeLogin(state) {
      return state.beforeLogin;
    },
    getShowModalLogin(state) {
      return state.showModalLogin;
    },
  },
  mutations: {
    setRouteBeforeLogin: (state, data) => {
      state.beforeLogin = data;
    },
    setShowModalLogin: (state, data) => {
      state.showModalLogin = data;
    },
  },
  actions: {
    setRouteBeforeLogin({ commit }, { route, path }) {
      commit("setRouteBeforeLogin", path);
    },
    setShowModalLogin({ commit }, { isShow }) {
      commit("setShowModalLogin", isShow);
    },
  },
};
export default route;
