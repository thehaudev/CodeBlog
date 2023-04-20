import instance from "../configs/axios";

const postsTagged = {
  namespaced: true,
  state() {
    return {
      count: 0,
      pagination: null,
      allPosts: [],
    };
  },
  getters: {
    getAllPosts(state) {
      return state.allPosts;
    },
    getPaginationPost(state) {
      return state.pagination;
    },
  },
  mutations: {
    setData: (state, listPosts) => {
      state.allPosts = listPosts.posts;
      state.count = listPosts.count;
      state.pagination = listPosts.pagination;
    },
  },
  actions: {
    async setCurrent_page(
      { commit },
      { current_page, limit = 10, sort, search, id }
    ) {
      const response = await instance.get("/tags/" + id + "/posts", {
        params: {
          search: search,
          sort: sort,
          limit: limit,
          page: current_page,
        },
      });

      commit("setData", response.data);
    },
  },
};
export default postsTagged;
