import { useRouter } from "vue-router";
import { taskService } from "@/teacher/services/taskService.js";
import { modalService } from "@/services/modalService.js";

export function useTasks() {
  const router = useRouter();

  async function deleteTask(id) {
    try {
      await taskService.delete(id, "/tasks/");
      router.push({ path: "/teacher/start/exercises" });
      modalService.show("Успешно удалено");
    } catch (e) {
      console.log(e);
      modalService.show("Упс что то пошло не так");
      throw e;
    }
  }

  async function saveTask(payload, isEditMode, id) {
    try {
      await taskService.save(payload, isEditMode, "/tasks", `/${id}`);
      modalService.show("Успешно сохранено");
      router.push({ path: "/teacher/start/exercises" });
    } catch (e) {
      console.log(e);
      modalService.show("Упс что то пошло не так");
      throw e;
    }
  }

  return {
    deleteTask,
    saveTask,
  };
}
