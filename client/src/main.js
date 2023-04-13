// import { createApp, ref, computed } from "vue";
// import { useStore } from "vuex";
// import App from "./App.vue";
// import router from "./router";
// import { registerGlobalComponent } from "./utils/import";
// import store from "./stores/index";
// import "./assets/styles/reset.css";
// import "./assets/styles/input.css";
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import socket from "./plugins/socket";
// const user = JSON.parse(localStorage.getItem("user"));
// if (user) {
//   store.commit("auth/setUser", user);
// }
// const app = createApp(App);
// registerGlobalComponent(app);
// app.component("QuillEditor", QuillEditor);
// app.use(router);
// app.use(store);
// (async function () {
//   await store.dispatch("posts/fetchData");
// })();
// // Lưu thông
// window.addEventListener("beforeunload", (event) => {
//   localStorage.setItem("socketConnection", JSON.stringify(socket.auth));
// });
// const socketConnection = localStorage.getItem("socketConnection");
// if (socketConnection) {
//   socket.auth = JSON.parse(socketConnection);
//   socket.connect();
//   // Xóa thông tin kết nối socket khỏi localStorage sau khi khởi  tạo lại kết nối
//   localStorage.removeItem("socketConnection");
// }
// app.mount("#app");
import { createApp } from "vue";
import { useStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import { registerGlobalComponent } from "./utils/import";
import store from "./stores/index";
import "./assets/styles/reset.css";
import "./assets/styles/input.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import socket from "./plugins/socket";

const app = createApp(App);
registerGlobalComponent(app);
app.component("QuillEditor", QuillEditor);
app.use(router);
app.use(store);
(async function () {
  await store.dispatch("posts/fetchData");
})();

// Lưu thông
window.addEventListener("beforeunload", () => {
  localStorage.setItem("socketConnection", JSON.stringify(socket.auth));
});

app.mount("#app");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  store.commit("auth/setUser", user);

  const socketConnection = localStorage.getItem("socketConnection");
  if (socketConnection) {
    socket.auth = JSON.parse(socketConnection);
    socket.connect();
    // Xóa thông tin kết nối socket khỏi localStorage sau khi khởi tạo lại kết nối
    localStorage.removeItem("socketConnection");
  }
}
