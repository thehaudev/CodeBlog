import { createApp } from "vue";
import { useStore } from "vuex";
import App from "./App.vue";
import router from "./router/router";
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

app.use(store).use(router);

app.mount("#app");
// window.addEventListener("beforeunload", () => {
//   console.log(socket.auth);
//   localStorage.setItem("socketConnection", JSON.stringify(socket.auth));
// });
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  store.commit("auth/setUser", user);
  const socketConnection = localStorage.getItem("socketConnection");
  if (socketConnection) {
    socket.auth = JSON.parse(socketConnection);
    socket.connect();
    // Xóa thông tin kết nối socket khỏi localStorage sau khi khởi tạo lại kết nối
    // localStorage.removeItem("socketConnection");
  }
}
