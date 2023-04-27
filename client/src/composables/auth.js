import axios from "axios";
import { instance, instanceWithAccess } from "../configs/axios";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

async function login(email, password) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
      email: email,
      password: password,
    });

    const { user, auth, refreshCookie, expiresIn } = res.data;
    return { user, auth, refreshCookie, expiresIn };
  } catch (err) {
    error.value = err.response.data.message;
    console.log(err);
  } finally {
    isPending.value = false;
  }
}

async function changeProfile(formData) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await instanceWithAccess.patch("/users/me", formData);
    const data = res.data.data;
    return data;
  } catch (err) {
    error.value = err.response?.data.message;
  } finally {
    isPending.value = false;
  }
}

async function changePassword(password, newPassword, confirmPassword) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await instanceWithAccess.patch("/auth/change-password", {
      confirmPassword: confirmPassword,
      newPassword: newPassword,
      password: password,
    });
    const { message } = res.data;
    return message;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}
async function signUp(email, password, displayName) {
  isPending.value = true;
  error.value = null;
  try {
    await axios.post("http://localhost:3000/api/v1/auth/register", {
      display_name: displayName,
      email: email,
      password: password,
    });
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}
async function accountRecovery(email) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/auth/forgotPassword",
      {
        email: email,
      }
    );
    return res.data;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}
async function resetPassword(newPassword, confirmPassword, token) {
  isPending.value = true;
  error.value = null;
  try {
    const res = await axios.patch(
      "http://localhost:3000/api/v1/auth/reset-password",
      {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
      {
        headers: { authorization: token },
      }
    );
    return res.data;
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}
export function useLogin() {
  return { error, isPending, login };
}

export function useSignUp() {
  return { error, isPending, signUp };
}

export function useRecovery() {
  return { error, isPending, accountRecovery };
}

export function useResetPassword() {
  return { error, isPending, resetPassword };
}
export function useChangeProfile() {
  return { error, isPending, changeProfile };
}

export function useChangePassword() {
  return { error, isPending, changePassword };
}
