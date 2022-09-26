<template>
  <div class="wrapper start">
    <h2 class="start__title">Упражнения</h2>
    <ul class="start__list">
      <li v-for="(v, i) in ids" :key="i" class="start__item">
        <router-link :to="`/student/${tasks[v].type}/${v}`" class="start__link">
          {{
            tasks[v].taskTitle ? tasks[v].taskTitle : "Упражнение " + (i + 1)
          }}
        </router-link>
      </li>
    </ul>
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

<style lang="scss">
.start {
  padding: 0;

  &__title {
    text-align: center;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    margin: 8px 0;
  }

  &__link {
    padding: 8px 0;
    color: $app-color;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    transition: color 0.5;

    &:hover {
      color: rgba($app-color, 0.5);
    }
  }
}
</style>
