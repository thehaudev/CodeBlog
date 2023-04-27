import { instance, instanceWithAccess } from "../configs/axios";

const notifications = {
  namespaced: true,
  state() {
    return {
      notificationsOfUser: null,
      pagination: null,
      totalNotRead: 0,
    };
  },
  getters: {
    getNotifications(state) {
      return state.notificationsOfUser;
    },
    getPagination(state) {
      return state.pagination;
    },
    getTotalNotRead(state) {
      return state.totalNotRead;
    },
  },
  mutations: {
    setNotificationOfUser: (state, data) => {
      state.notificationsOfUser = data.notifications;
      state.pagination = data.pagination;
      state.totalNotRead = data.totalNotRead;
    },
    pushNotificationIO: (state, data) => {
      state.notificationsOfUser.unshift(data);
      state.totalNotRead += 1;
    },
  },
  actions: {
    async createNewPostNotification({ commit }, { postId, link, content }) {
      instanceWithAccess.post("/notifications/new-post/" + postId, {
        link: link,
        content: content,
      });
    },
    async createNewCommentNotification({ commit }, { commentId, link }) {
      instanceWithAccess.post("/notifications/new-comment/" + commentId, {
        link: link,
      });
    },
    async setNotificationOfUser({ commit }, { limit }) {
      const res = await instanceWithAccess.get("/users/notifications", {
        params: {
          limit: limit,
        },
      });
      commit("setNotificationOfUser", res.data);
    },
    async readNotification({}, { id }) {
      await instanceWithAccess.patch("/notifications/read/" + id);
    },
    pushNotificationIO({ commit }, { notification }) {
      commit("pushNotificationIO", notification);
    },
  },
};
export default notifications;
