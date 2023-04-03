import instance from "../configs/axios"

const tags = {
    namespaced:true,
    state () {
      return {
        listTags: [],
      }
    },
    getters:{
      getAllTags (state) {
        return state.listTags
      }
    },
    mutations: {
        setData: (state, listTags) => (state.listTags = listTags)
    },
    actions:{
        async fetchData({ commit }) {
            const response = await instance.get('tags')
            commit('setData', response.data.data)
        },
    }
  }
  export default tags
