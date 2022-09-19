import { firebaseService } from "@/services/firebaseService.js";

import { modalService } from "@/services/modalService.js";

export const taskService = {
  save(payload, isEditMode, path, id) {
    isEditMode ? this.edit(payload, path, id) : this.create(payload, path);
  },

  async create(payload, path) {
    try {
      await firebaseService.create(payload, path);
      modalService.show("Успешно сохранено");
    } catch (e) {
      modalService.show("Что то пошло не так упс");
      throw e;
    }
  },

  async edit(payload, path, id) {
    try {
      await firebaseService.edit(id, payload, path);
      modalService.show("Успешно изменено");
    } catch (e) {
      modalService.show("Что то пошло не так упс");
      throw e;
    }
  },

  async delete(id, path) {
    try {
      await firebaseService.delete(id, path);
      modalService.show("Успешно удалено");
    } catch (e) {
      modalService.show("Что то пошло не так упс");
      throw e;
    }
  },
};
