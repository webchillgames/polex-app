import { createRouter, createWebHashHistory } from "vue-router";

import StartPageTeacher from "@/teacher/pages/StartPage.vue";
import FillEmptyTeacher from "@/teacher/pages/FillEmpty.vue";
import StartPageStudent from "@/student/pages/StartPage.vue";

import HomePage from "@/home/HomePage.vue";
import FillEmptyStudent from "@/student/pages/FillEmpty.vue";
import TeacherAuth from "@/teacher/pages/TeacherAuthPage.vue";

import VideosEditor from "@/teacher/pages/VideosEditor.vue";
import ChooseTranslationTeacher from "@/teacher/pages/ChooseTranslation.vue";

import { useTeacherStore } from "@/stores/teacher";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // TEACHER
    {
      path: "/teacher/start/:tab?",
      component: StartPageTeacher,
    },
    {
      path: "/teacher/auth",
      component: TeacherAuth,
    },
    {
      path: "/teacher/settings/videos",
      component: VideosEditor,
    },
    {
      path: "/teacher/fill-empty/:action/:id?",
      component: FillEmptyTeacher,
    },
    {
      path: "/teacher/choose-translation/:action/:id?",
      component: ChooseTranslationTeacher,
    },

    // STUDENT
    {
      path: "/student/start",
      component: StartPageStudent,
    },
    {
      path: "/student/fill-empty/:id",
      component: FillEmptyStudent,
    },
    {
      path: "/",
      component: HomePage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const teacherStore = useTeacherStore();

  if (
    to.path.startsWith("/teacher/") &&
    to.path !== "/teacher/auth" &&
    !teacherStore.teacher
  ) {
    next({ path: "/teacher/auth" });
  } else next();
});

export default router;
