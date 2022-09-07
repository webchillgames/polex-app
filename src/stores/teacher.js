import { defineStore } from "pinia";
import { localStorage } from "@/services/localStorage";

export const useTeacherStore = defineStore({
  id: "teacher",
  state: () => ({
    teacher: localStorage.get("polex-teacher") || null,
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    get() {
      this.counter++;
    },
  },
});
