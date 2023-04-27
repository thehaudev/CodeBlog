import { instance, instanceWithAccess } from "../configs/axios";

const tags = {
  namespaced: true,
  state() {
    return {
      listTags: [],
      tagInPostTagged: null,
      tagsShowInHome: null,
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
    tagsShowInHome(state) {
      return state.tagsShowInHome;
    },
    tagInPostTagged(state) {
      return state.tagInPostTagged;
    },
  },
  mutations: {
    setData: (state, listTags) => {
      state.listTags = listTags.data;
      state.pagination = listTags.pagination;
    },
    setTagsShowInHome: (state, listTags) => {
      state.tagsShowInHome = listTags.data;
    },
    setTagInPostTagged: (state, tag) => {
      state.tagInPostTagged = tag.data;
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
    async filterTagsShowInHome({ commit }, { current_page, search, sort }) {
      const response = await instance.get("/tags", {
        params: {
          sort: sort,
          page: current_page,
          search: search,
        },
      });
      commit("setTagsShowInHome", response.data);
    },
    async setTagInPostTagged({ commit }, { tagId }) {
      const response = await instance.get("/tags/" + tagId);
      commit("setTagInPostTagged", response.data);
    },
    async follow({ commit }, { tagId }) {
      const res = await instanceWithAccess.get("/follow_tag", {
        params: {
          tagId: tagId,
        },
      });
      if (res.data.data) {
        await instanceWithAccess.delete("/follow_tag", {
          data: {
            tagId: tagId,
          },
        });
      } else {
        await instanceWithAccess.post("/follow_tag", {
          tagId: tagId,
        });
      }
    },
  },
};
export default tags;
