import instance from "../configs/axios";

const tags = {
  namespaced: true,
  state() {
    return {
      listTags: [],
      pagination: null,
    };
  },
  getters: {
    getAllTags(state) {
      return state.listTags;
    },
    getPagination(state) {
      return state.pagination;
    },
  },
  mutations: {
    setData: (state, listTags) => {
      state.listTags = listTags.data;
      state.pagination = listTags.pagination;
    },
  },
  actions: {
    async filterTag({ commit }, { current_page, search, sort }) {
      const response = await instance.get("/tags", {
        params: {
          sort: sort,
          page: current_page,
          search: search,
        },
      });
      commit("setData", response.data);
    },
    async follow({ commit }, { tagId }) {
      const res = await instance.get("/follow_tag", {
        params: {
          tagId: tagId,
        },
      });
      if (res.data.data) {
        await instance.delete("/follow_tag", {
          data: {
            tagId: tagId,
          },
        });
      } else {
        await instance.post("/follow_tag", {
          tagId: tagId,
        });
      }
    },
  },
};
export default tags;
