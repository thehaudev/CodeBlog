import instance from "../configs/axios"

const posts = {
    namespaced:true,
    state () {
      return {
        count:0,
        pagination:null,
        allPosts: [],
      }
    },
    getters:{
      getAllPosts (state) {
        return state.allPosts
      },
      getPaginationPost (state){
        return state.pagination
      }
    },
    mutations: {
        setData: (state, listPosts) => {
            state.allPosts = listPosts.posts
            state.count = listPosts.count
            state.pagination =listPosts.pagination
        },
    },
    actions:{
        async fetchData({ commit }) {
            const response = await instance.get('/posts')
            commit('setData', response.data)
        },
        async setCurrent_page({commit},{current_page}){
          const response = await instance.get('/posts',{
            params:{
                page:current_page
            }
        })
        commit('setData', response.data)
      },
    }
  }
  export default posts
