<template>
  <div class="wrapper">
    <ModalOk />
    <nav class="main-nav">
      <RouterLink to="/" class="link main-nav__link">Polex</RouterLink>
      <RouterLink to="/teacher/start/creating" class="link main-nav__link"
        >Teacher</RouterLink
      >
      <RouterLink to="/student/start" class="link main-nav__link"
        >Student</RouterLink
      >
    </nav>

    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

import "@/styles/style.scss";

import ModalOk from "@/components/ModalOk.vue";

export default {
  components: { ModalOk },
  setup() {
    return {
      ModalOk,
      RouterLink,
      RouterView,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  display: flex;

  &__link {
    padding: 8px;
    color: #000;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
