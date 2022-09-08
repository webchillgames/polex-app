import { fbService } from "@/services/fbService.js";

export async function loadTasks(list) {
  const res = await fbService.fetchList(list);
  return res;
}
