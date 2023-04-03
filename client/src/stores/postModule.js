import instance from "../configs/axios"

const postDetail = {
    namespaced:true,
    state () {
      return {
        post:null,
        commentsInPost:[],
        countOfComments:0,
        paginationOfComments:null,
      }
    },
    getters:{
      getPost (state) {
        return state.post
      },
      getCommentsInPost (state) {
        return state.commentsInPost
      }
    },
    mutations: {
        setData: (state, data) => {
            state.post = data.post
            state.commentsInPost = data.comments.comments
            state.countOfComments =data.comments.count
            state.paginationOfComments = data.comments.pagination
        }
    },
    actions:{
        async fetchData({ commit },{postId}) {
            const response = await instance.get('/posts/'+postId)
            const comments = await instance.get('/posts/'+postId+'/comments')

            commit('setData', {post:response.data.post,comments:comments.data.data})
        },
    }
  }
  export default postDetail
