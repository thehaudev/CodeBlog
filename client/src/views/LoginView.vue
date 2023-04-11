<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useLogin } from "../composables/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const routeBeforeLogin = computed(
  () => store.getters["route/getRouteBeforeLogin"]
);
const { error, isPending, login } = useLogin();
error.value = null;
const email = ref("");
const password = ref("");
async function sign() {
  try {
    const { user, auth } = await login(email.value, password.value);
    if (!error.value) {
      store.dispatch("auth/setUserToken", { user: user });
      localStorage.setItem("accessToken", JSON.stringify(auth));
      if (routeBeforeLogin.value) router.push({ name: routeBeforeLogin.value });
      else router.push({ name: "home", params: {} });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="body">
    <main>
      <a href="#" class="favicon">
        <img src="../assets/favicon/ms-icon-70x70.png" alt="favicon" />
      </a>
      <a href="#" class="login-btn google">
        <p><i class="fa-brands fa-google"></i> Login with Google</p>
      </a>
      <a href="#" class="login-btn github">
        <p><i class="fa-brands fa-github"></i> Login with Github</p>
      </a>
      <a href="#" class="login-btn facebook">
        <p><i class="fa-brands fa-square-facebook"></i> Login with Facebook</p>
      </a>
      <form @submit.prevent="sign" class="formLogin">
        <div class="row">
          <label for="email">Email</label>
          <input autofocus v-model="email" required type="email" name="email" />
        </div>
        <div class="row">
          <div class="label-password">
            <label for="password">Password</label>
            <router-link :to="{ name: 'account-recovery' }"
              >Forgot password?</router-link
            >
          </div>
          <input v-model="password" required type="password" name="password" />
          <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div class="row">
          <button v-if="isPending">...</button>
          <button v-else type="submit">Log in</button>
        </div>
      </form>
      <p class="sign-up">
        Don’t have an account?
        <router-link to="/auth/register">Sign up</router-link>
      </p>
    </main>
  </div>
</template>

<style scoped>
.body {
  height: 100vh;
  widows: 100%;
  display: flex;
  justify-content: center;
  background-color: #f1f2f3;
}
main {
  background-color: #f1f2f3;
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
p.error {
  color: rgb(255, 69, 69);
  margin: 5px;
  font-size: 14px;
}
.favicon {
  height: 47px;
  margin-bottom: 10px;
}
.favicon img {
  object-fit: contain;
  max-height: 47px;
}

.login-btn {
  border: 0.5px solid #a8acb1;
  border-radius: 10px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  font-weight: 200;
}

.login-btn.github {
  background-color: #2f3337;
  color: white;
}
.login-btn.facebook {
  background-color: #385499;
  color: white;
}
.formLogin {
  background-color: #fff;
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 20px;
  border-radius: 7px;
  margin: 10px 0px 0px;
}
.formLogin .row {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.row label {
  font-weight: bold;
}
.row input {
  border: 0.6px solid #a8acb1;
  height: 32px;
  border-radius: 2px;
  margin-top: 5px;
  padding: 10px;
}
.row button {
  color: white;
  background-color: #0a95ff;
  height: 32px;
  border-radius: 2px;
}

.sign-up {
  margin: 20px 0 0;
}
.sign-up a {
  color: #0a95ff;
}
.label-password {
  display: flex;
  justify-content: space-between;
}
.label-password a {
  color: #21a7ef;
  font-size: 14px;
}
</style>
