import instance from "../configs/axios"

const users = {
    namespaced:true,
    state () {
      return {
        listUsers: [],
        pagination:null,
      }
    },
    getters:{
      getAllUsers (state) {
        return state.listUsers
      },
      getPagination(state){
        return state.pagination
      }
    },
    mutations: {
        setData: (state, listUsers) => {
          state.listUsers = listUsers.data
          state.pagination = listUsers.pagination
        }
    },
    actions:{
        async filterUser({commit},{current_page,search}){
          const response = await instance.get('/users',{
            params:{
                page:current_page,
                search:search
            }
        })
        commit('setData', response.data)
        }
    }
  }
  export default users
