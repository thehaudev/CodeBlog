<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
async function onLogout() {
  await store.dispatch("auth/logout");
  router.push("login");
}
onLogout();
</script>
