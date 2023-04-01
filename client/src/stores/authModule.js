const auth = {
    namespaced:true,
    state () {
      return {
        user: null,
      }
    },
    getters:{
      getUser (state) {
        return state.user
      }
    },
    mutations: {
        setUser: (state, user) => (state.user = user)
    },
    actions:{
      setUserToken({commit},{user}){
        commit("setUser",user)
        localStorage.setItem('user', JSON.stringify(user));
      },
      logout({ commit }) {
        commit('setUser', null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      },
    }
  }
  export default auth
