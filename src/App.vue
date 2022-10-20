<template>
  <div class="app">
    <ModalOk />
    <CNavigation />
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, computed } from "vue";

import "@/styles/style.scss";

import ModalOk from "@/components/ModalOk.vue";
import CNavigation from "./components/CNavigation.vue";

export default {
  components: { ModalOk, CNavigation },
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
      isMenuShow,
      ModalOk,
      RouterLink,
      RouterView,
      CNavigation,
    };
  },
};
</script>

<style lang="scss">
.app {
  position: relative;
}
</style>
