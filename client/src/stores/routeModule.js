import instance from "../configs/axios"

const route = {
    namespaced:true,
    state () {
      return {
        beforeLogin:null
      }
    },
    getters:{
        getRouteBeforeLogin(state){
            return state.beforeLogin
        }
    },
    mutations: {
        setRouteBeforeLogin:(state,data)=>{
            state.beforeLogin = data
        }
    },
    actions:{
        setRouteBeforeLogin({commit},{route}){
            commit('setRouteBeforeLogin',route)
        }
    }
  }
  export default route
