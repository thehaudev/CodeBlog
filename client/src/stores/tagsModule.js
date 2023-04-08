import instance from "../configs/axios"

const tags = {
    namespaced:true,
    state () {
      return {
        listTags: [],
        pagination:null,
      }
    },
    getters:{
      getAllTags (state) {
        return state.listTags
      },
      getPagination(state){
        return state.pagination
      }
    },
    mutations: {
        setData: (state, listTags) => {
          state.listTags = listTags.data
          state.pagination = listTags.pagination
        }
    },
    actions:{
        // async fetchData({ commit }) {
        //     const response = await instance.get('tags')
        //     commit('setData', response.data)
        // },
        // async setCurrent_page({commit},{current_page}){
        //   const response = await instance.get('/tags',{
        //     params:{
        //         page:current_page
        //     }
        // })
        // commit('setData', response.data)
        // },
        async filterTag({commit},{current_page,search}){
          const response = await instance.get('/tags',{
            params:{
                page:current_page,
                search:search
            }
        })
        commit('setData', response.data)
        },
        async follow({commit},{tagId}){
          const res = await instance.get('/follow_tag',{
              params:{
                tagId:tagId
              }
          })
          if(res.data.data){
            await instance.delete('/follow_tag',{
              data:{
                tagId:tagId
              }
            })
          }else{
            await instance.post('/follow_tag',{
                tagId:tagId
            })
          }
        }
    }
  }
  export default tags
