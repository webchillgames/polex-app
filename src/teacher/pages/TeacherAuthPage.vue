<template>
  <div>
    <h2>Привет! Здесь нужно ввести специальные учительские данные для входа</h2>
    <a-input
      v-model:value="login"
      placeholder="Логин"
      :style="{ margin: '10px 0' }"
    />
    <a-input
      v-model:value="password"
      placeholder="Пароль"
      :style="{ margin: '10px 0' }"
    />
    <a-button
      type="primary"
      block
      :disabled="!login && !password"
      @click="auth"
    >
      Войти
    </a-button>

    <div v-if="showError"></div>

    <a-modal v-model:visible="showError" title="Ошибка">
      <p>Неправильный логин или пароль. Попробуй еще раз...</p>

      <template #footer>
        <a-button key="submit" type="primary" @click="showError = false"
          >Закрыть</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";

import { authService } from "@/teacher/services/authService.js";

import { useTeacherStore } from "@/stores/teacher";

import { useRouter } from "vue-router";

export default {
  setup() {
    const login = ref("");
    const password = ref("");
    const showError = ref(false);

    const router = useRouter();
    const teacherStore = useTeacherStore();

    const teacher = computed(() => {
      return teacherStore.teacher;
    });

    async function auth() {
      try {
        await authService.auth(login.value, password.value);
        router.push({ path: "/teacher/start/creating" });
        console.log(teacher.value);
      } catch (e) {
        console.log(e);
        showError.value = true;
      }
    }

    onMounted(() => {
      if (teacher.value) {
        router.push({ path: "/teacher/start/creating" });
      }
    });

    return {
      auth,
      login,
      password,
      showError,
    };
  },
};
</script>

<style></style>
