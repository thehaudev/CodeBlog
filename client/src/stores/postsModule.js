import instance from "../configs/axios";

const posts = {
  namespaced: true,
  state() {
    return {
      count: 0,
      pagination: null,
      allPosts: [],
      postsOfUser: [],
      bookmarkPostsOfUser: [],
      postsInTrashOfUser: [],
      paginationPostsOfUser: null,
      paginationBookmarkPostsOfUser: null,
      paginationPostsInTrashOfUser: null,
    };
  },
  getters: {
    getAllPosts(state) {
      return state.allPosts;
    },
    getPaginationPost(state) {
      return state.pagination;
    },
    paginationPostsOfUser(state) {
      return state.paginationPostsOfUser;
    },
    getPostsOfUser(state) {
      return state.postsOfUser;
    },
    paginationBookmarkPostsOfUser(state) {
      return state.paginationBookmarkPostsOfUser;
    },
    getBookmarkPostsOfUser(state) {
      return state.bookmarkPostsOfUser;
    },
    paginationPostsInTrashOfUser(state) {
      return state.paginationPostsInTrashOfUser;
    },
    getPostsInTrashOfUser(state) {
      return state.postsInTrashOfUser;
    },
  },
  mutations: {
    setData: (state, listPosts) => {
      state.allPosts = listPosts.posts;
      state.count = listPosts.count;
      state.pagination = listPosts.pagination;
    },
    setPostsOfUser: (state, data) => {
      state.paginationPostsOfUser = data.pagination;
      state.postsOfUser = data.posts;
    },
    setBookmarkPostsOfUser: (state, data) => {
      state.paginationBookmarkPostsOfUser = data.pagination;
      state.bookmarkPostsOfUser = data.posts;
    },
    setPostsInTrashOfUser: (state, data) => {
      state.paginationPostsInTrashOfUser = data.pagination;
      state.postsInTrashOfUser = data.posts;
    },
  },
  actions: {
    async fetchData({ commit }) {
      const response = await instance.get("/posts", {
        params: {
          limit: 7,
        },
      });
      commit("setData", response.data);
    },
    async setCurrent_page(
      { commit },
      { current_page, limit = 10, sort, search }
    ) {
      const response = await instance.get("/posts", {
        params: {
          search: search,
          sort: sort,
          limit: limit,
          page: current_page,
        },
      });
      commit("setData", response.data);
    },
    async setPostsOfUser(
      { commit },
      { id, search, limit, current_page, sort }
    ) {
      const postsOfUser = await instance.get("/users/" + id + "/posts", {
        params: {
          search: search,
          limit: limit,
          page: current_page,
          sort: sort,
        },
      });
      commit("setPostsOfUser", postsOfUser.data);
    },
    async setBookmarkPostsOfUser(
      { commit },
      { id, search, limit, current_page, sort }
    ) {
      const postsOfUser = await instance.get("/posts/bookmarks/" + id, {
        params: {
          search: search,
          limit: limit,
          page: current_page,
          sort: sort,
        },
      });
      commit("setBookmarkPostsOfUser", postsOfUser.data);
    },
    async setPostsInTrashOfUser(
      { commit },
      { id, search, limit, current_page, sort }
    ) {
      const postsOfUser = await instance.get("/posts/trash/" + id, {
        params: {
          search: search,
          limit: limit,
          page: current_page,
          sort: sort,
        },
      });
      commit("setPostsInTrashOfUser", postsOfUser.data);
    },
    async editStatusOfPost({}, { postId, status }) {
      await instance.patch("/posts/" + postId, {
        status: status,
      });
    },
  },
};
export default posts;
