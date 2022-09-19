import { firebaseService } from "@/services/firebaseService.js";

export const taskService = {
  save(payload, isEditMode, path, id) {
    isEditMode ? this.edit(id, payload, path) : this.create(payload, path);
  },

  async create(payload, path) {
    await firebaseService.create(payload, path);
  },

  async edit(id, payload, path) {
    await firebaseService.edit(id, payload, path);
  },

  async delete(id, path) {
    await firebaseService.delete(id, path);
  },
};
