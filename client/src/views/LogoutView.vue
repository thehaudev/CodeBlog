<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import socket from "../plugins/socket";
const store = useStore();
const router = useRouter();
async function onLogout() {
  await store.dispatch("auth/logout");
  await store.dispatch("route/setRouteBeforeLogin", {
    route: null,
  });
  router.push("login");
}
onLogout();
</script>
