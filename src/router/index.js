import { createRouter, createWebHashHistory } from "vue-router";
import StartPageTeacher from "@/teacher/pages/StartPage.vue";
import FillEmptyTeacher from "@/teacher/pages/FillEmpty.vue";
import StartPageStudent from "@/student/pages/StartPage.vue";
import HomePage from "@/home/HomePage.vue";
import FillEmptyStudent from "@/student/pages/FillEmpty.vue";
import TeacherAuth from "@/teacher/pages/TeacherAuthPage.vue";
import VideosEditor from "@/teacher/pages/VideosEditor.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // TEACHER
    {
      path: "/teacher/start",
      name: "teacher-start",
      component: StartPageTeacher,
    },
    {
      path: "/teacher/auth",
      name: "teacher-auth",
      component: TeacherAuth,
    },
    {
      path: "/teacher/settings/videos",
      name: "teacher-settings-videos",
      component: VideosEditor,
    },
    {
      path: "/teacher/fill-empty/:action",
      name: "fill-empty-creator",
      component: FillEmptyTeacher,
    },
    {
      path: "/teacher/fill-empty/:action/:id",
      name: "fill-empty-editor",
      component: FillEmptyTeacher,
    },
    // STUDENT
    {
      path: "/student/start",
      name: "student-start",
      component: StartPageStudent,
    },
    {
      path: "/student/fill-empty/:id",
      name: "student-task-page",
      component: FillEmptyStudent,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
  ],
});

export default router;
