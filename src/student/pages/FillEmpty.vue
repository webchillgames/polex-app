<template>
  <p v-if="isLoading">Загрузка упражнения...</p>
  <TaskView
    :url="url"
    :currentId="currentId"
    :length="task.length"
    :isDone="isDone"
    v-else
  >
    <h3 v-if="title">{{ title }}</h3>
    <p>Задание: вставьте пропущенные буквы</p>

    <div class="d-flex flex-row" v-if="task" :style="{ margin: '20px 0' }">
      <div
        v-for="(v, i) in task[currentId].lesson"
        :key="i"
        class="d-flex flex-row"
      >
        <input
          maxlength="1"
          v-if="v === '_'"
          class="input"
          @input="(e) => setChar(e, i, task[currentId].word)"
        />
        <span v-else class="item d-flex flex-row">{{ v }}</span>
      </div>
    </div>
  </TaskView>
</template>

<script>
import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

import { firebaseService } from "@/services/firebaseService.js";

import { FILL_EMPTY_INFO_STUDENT } from "@/assets/tips.js";

import TaskView from "@/student/views/TaskView.vue";

export default {
  components: { TaskView },

  setup() {
    const route = useRoute();
    const task = ref([]);
    const currentId = ref(0);

    const url = ref("");
    const title = ref("");
    const comparedItem = ref("");

    const isLoading = ref(true);
    const isDone = ref(false);

    async function loadTask() {
      try {
        const res = await firebaseService.fetchById(route.params.id, "/tasks/");

        comparedItem.value = res.data[currentId.value].lesson;
        task.value = res.data;
        title.value = res.taskTitle;
        url.value = res.youtubeLink;
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    }

    function setChar(e, i, rightWord) {
      const editedWord = comparedItem.value.split("");

      editedWord[i] = e.target.value;
      comparedItem.value = editedWord.join("");

      if (comparedItem.value.toLowerCase() === rightWord.toLowerCase()) {
        setTimeout(() => {
          if (currentId.value === task.value.length - 1) {
            isDone.value = true;
          } else {
            currentId.value = currentId.value + 1;
            comparedItem.value = task.value[currentId.value].lesson;

            const inputs = document.querySelectorAll("input");
            inputs.forEach((v) => {
              v.value = "";
            });
          }
        }, 1000);
      }
    }

    onMounted(loadTask);

    return {
      url,
      setChar,
      task,
      isLoading,
      currentId,
      isDone,
      FILL_EMPTY_INFO_STUDENT,
      TaskView,
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  min-width: 50px;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
}

.input {
  width: 50px;
  border: 1px solid orange;
}

.item,
.input {
  margin-right: 2px;
  padding: 10px 5px;
}
</style>
