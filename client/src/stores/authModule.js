import instance from "../configs/axios"

const auth = {
    namespaced:true,
    state () {
      return {
        user: null,
        tagsFollowing:null
      }
    },
    getters:{
      getUser (state) {
        return state.user
      },
      getTagsFollowing(state){
        return state.tagsFollowing
      }
    },
    mutations: {
        setUser: (state, user) => {
          state.user = user
        },
        setTagsFollowing:(state,data)=>{
          state.tagsFollowing=data
        }
    },
    actions:{
      setUserToken({commit},{user}){
        commit("setUser",user)
        localStorage.setItem('user', JSON.stringify(user));
      },
      async setTagsFollowing({commit}){
        const res = await instance.get('/users/me/tagsFollowing')
        commit('setTagsFollowing',res.data.data)
      },
      logout({ commit }) {
        commit('setUser', null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      },
    }
  }
  export default auth
