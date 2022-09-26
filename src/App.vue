<template>
  <div class="wrapper main">
    <ModalOk />
    <nav class="main__nav">
      <RouterLink to="/" class="main__logo">PolEx</RouterLink>

      <div>
        <router-link
          v-for="(v, i) in navLinks"
          :key="i"
          :to="v.link"
          class="main__link"
          :class="{ active: activeTab === v.title }"
          >{{ v.title }}</router-link
        >
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";

import "@/styles/style.scss";

import ModalOk from "@/components/ModalOk.vue";
import { ref, watch, computed } from "vue";

const navLinks = [
  { link: "/teacher/start/creating", title: "Teacher" },
  { link: "/student/start", title: "Student" },
];

export default {
  components: { ModalOk },
  setup() {
    const isMenuShow = ref(false);

    const route = useRoute();

    const activeTab = computed(() => {
      if (route.path.startsWith("/teacher")) {
        return "Teacher";
      }

      if (route.path.startsWith("/student")) {
        return "Student";
      }

      return "";
    });

    return {
      activeTab,
      navLinks,
      isMenuShow,
      ModalOk,
      RouterLink,
      RouterView,
    };
  },
};
</script>

<style lang="scss">
.main {
  &__logo {
    font-family: "Rubik Dirt", cursive;
    color: $app-color;
    font-size: 30px;
    line-height: 40px;
    transition: all 0.5s;

    &:hover {
      color: $app-color-hover;
    }
  }

  &__nav {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  &__link {
    font-weight: 700;
    font-size: 25px;
    line-height: 38px;
    color: $app-color;
    position: relative;

    &:hover {
      color: rgba($app-color, 0.7);
    }

    & + .main__link {
      margin-left: 20px;
    }

    &::after {
      content: "";
      bottom: -4px;
      left: 20%;
      width: 60%;
      height: 4px;
      border-radius: 2px;
      background-color: $app-color-hover;
      position: absolute;
      opacity: 0;
      transition: opacity 0.1s;
    }

    &.active::after {
      opacity: 1;
    }
  }
}
</style>
