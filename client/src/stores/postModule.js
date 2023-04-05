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
      },
      isVote(state) {
        return state.isVote
      },
      isBookmark(state){
        return state.isBookmark
      },
      isFollow(state){
        return state.isFollow
      }
    },
    mutations: {
        setData: (state, data) => {
            state.post = data.post
            state.commentsInPost = data.comments.comments
            state.countOfComments =data.comments.count
            state.paginationOfComments = data.comments.pagination
        },
        setActive:(state,data)=>{
          if(data.voteType)state.isVote = data.voteType
          else state.isVote = null
          if(data.isBookmark) state.isBookmark = true
          else state.isBookmark = false
          if(data.isFollow) state.isFollow=true
          else state.isFollow = false
        }
    },
    actions:{
        async fetchData({commit },{postId}) {
            const response = await instance.get('/posts/'+postId)
            const comments = await instance.get('/posts/'+postId+'/comments')
            // if(localStorage.getItem("accessToken")){
            //   const isVote = await instance.get('/vote_post/'+postId)
            //   const isBookmark = await  instance.get('/bookmarks/'+postId)
            //   const isFollow =  await instance.get('/follow_user/'+response.data.post.user._id)
            //   commit('setActive', {voteType:isVote.data.data?.type
            //     ,isBookmark:isBookmark.data.data,isFollow:isFollow.data.data})
            // }
            commit('setData', {post:response.data.post,comments:comments.data.data})
        },
        async fetchActive({commit,state},{postId}){
          if(localStorage.getItem("accessToken")){
            const isVote = await instance.get('/vote_post/'+postId)
            const isBookmark = await  instance.get('/bookmarks/'+postId)
            const isFollow =  await instance.get('/follow_user/'+state.post.user._id)
            commit('setActive', {voteType:isVote.data.data?.type
              ,isBookmark:isBookmark.data.data,isFollow:isFollow.data.data})
          }
        }
    }
  }
  export default postDetail
