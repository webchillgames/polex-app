<template>
  <div>
    <h2>Привет! Здесь нужно ввести специальные учительские данные для входа</h2>
    <a-input v-model:value="login" placeholder="Логин" />
    <a-input v-model:value="password" placeholder="Пароль" />
    <a-button type="primary" block :disabled="login && password">
      Войти
    </a-button>
  </div>
</template>

<script>
import { ref } from "vue";
import authService from "@/services/authService.js";

export default {
  setup() {
    const login = ref("");
    const password = ref("");

    function auth() {
      authService.auth(login.value, password.value);
    }

    return {
      auth,
      login,
      password,
    };
  },
};
</script>

<style></style>
