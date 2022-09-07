<template>
  <div class="wrapper">
    <ul>
      <li v-for="(v, i) in ids" :key="i">
        <router-link :to="`/student/task/${tasks[v].type}/${v}`">{{
          tasks[v].taskTitle
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { onValue } from "firebase/database";
import { fbDatabase, fbRef } from "@/firebase";

export default {
  setup() {
    const tasks = ref([]);
    const ids = ref([]);
    const starCountRef = fbRef(fbDatabase, "/tasks");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      ids.value = Object.keys(data);
      tasks.value = data;
    });

    return {
      tasks,
      ids,
    };
  },
};
</script>
