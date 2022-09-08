<template>
  <div class="wrapper">
    <a-list size="small" bordered :data-source="ids" v-if="ids">
      <template #renderItem="{ item }">
        <a-list-item>
          <router-link :to="`/student/${tasks[item].type}/${item}`">
            {{ tasks[item].taskTitle ? tasks[item].taskTitle : "Упражнение" }}
          </router-link>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import { loadTasks } from "@/helpers/fbHelpers.js";

export default {
  setup() {
    const tasks = ref(null);
    const ids = ref([]);

    onMounted(load);

    async function load() {
      try {
        const response = await loadTasks("/tasks");
        if (response !== null) {
          tasks.value = response;
          ids.value = Object.keys(response);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // const starCountRef = fbRef(fbDatabase, "/tasks");

    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   ids.value = Object.keys(data);
    //   tasks.value = data;
    // });

    return {
      tasks,
      ids,
    };
  },
};
</script>
