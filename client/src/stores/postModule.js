import instance from "../configs/axios"
import { useStore } from "vuex"
const store = useStore()
const postDetail = {
    namespaced:true,
    state () {
      return {
        post:null,
        commentsInPost:null,
        countOfComments:0,
        paginationOfComments:null,
        isVote:null,
        isBookmark:false,
        isFollow:false
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
        },
    },
    actions:{
        async fetchData({ commit },{postId}) {
            const response = await instance.get('/posts/'+postId)
            const comments = await instance.get('/posts/'+postId+'/comments')
            if(localStorage.getItem("accessToken")){
              const isVote = await instance.get('/vote_post/'+postId)
              const isBookmark = await  instance.get('/bookmarks/'+postId)
              const isFollow = await instance.get('/follow_user/'+postId)
              console.log(isVote,isFollow,isBookmark)
            }
            commit('setData', {post:response.data.post,comments:comments.data.data})
        },
    }
  }
  export default postDetail
