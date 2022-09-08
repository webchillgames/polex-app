<template>
  <div v-if="teacher">
    <slot />
  </div>
</template>

<script>
import { useTeacherStore } from "@/stores/teacher";

import { computed, onMounted } from "vue";

import router from "@/router";

export default {
  setup() {
    const teacherStore = useTeacherStore();

    const teacher = computed(() => {
      return teacherStore.teacher;
    });

    onMounted(() => {
      if (!teacher.value) {
        router.push({ path: "/teacher/auth" });
      }
    });

    return {
      teacher,
    };
  },
};
</script>
