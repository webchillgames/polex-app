<template>
  <div class="wrapper">
    <nav class="main-nav">
      <RouterLink to="/" class="link main-nav__link">Polex</RouterLink>
      <RouterLink to="/teacher/start" class="link main-nav__link"
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

export default {
  setup() {
    return {
      RouterLink,
      RouterView,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  display: flex;
}

.main-nav__link {
  padding: 8px;
  color: #000;

  &:hover {
    text-decoration: underline;
  }
}
</style>
