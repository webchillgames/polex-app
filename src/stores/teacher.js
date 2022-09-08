import { defineStore } from "pinia";
import { localStorage } from "@/services/localStorage";

export const useTeacherStore = defineStore({
  id: "teacher",
  state: () => ({
    teacher: null || localStorage.get("polex-teacher"),
  }),
  actions: {
    setTeacher(data) {
      this.teacher = data;
      localStorage.set("polex-teacher", this.teacher);
    },
    removeTeacher() {
      localStorage.remove("polex-teacher");
      this.teacher = null;
    },
  },
});
