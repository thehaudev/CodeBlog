import instance from "../configs/axios"

const notifications = {
    namespaced:true,
    state () {
      return {
        notificationsOfUser:null,
        pagination:null,
        totalNotRead:0
      }
    },
    getters:{
        getNotifications (state) {
            return state.notificationsOfUser
        },
        getPagination(state) {
            return state.pagination
        },getTotalNotRead(state){
            return state.totalNotRead
        }
      },
    mutations: {
        setNotificationOfUser:(state,data)=>{
            state.notificationsOfUser = data.notifications
            state.pagination = data.pagination
            state.totalNotRead =data.totalNotRead
        }
    },
    actions:{
        async createNewPostNotification({commit},{postId,link,content}){
            instance.post('/notifications/new-post/'+postId,{
                link:link,
                content:content
            })
        },
        async createNewCommentNotification({commit},{commentId,link}){
            instance.post('/notifications/new-comment/'+commentId,{
                link:link
            })
        },
        async setNotificationOfUser({commit}){
            const res = await instance.get('/users/notifications')
            commit('setNotificationOfUser',res.data)
        }
    }
  }
  export default notifications
