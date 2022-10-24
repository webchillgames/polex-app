<template>
  <p v-if="isLoading">Загрузка упражнения...</p>
  <TaskView
    :url="url"
    :currentId="currentId"
    :length="task.length"
    :isDone="isDone"
    v-else
  >
    <div class="fill-empty">
      <h2 v-if="title" class="fill-empty__title">{{ title }}</h2>
      <p>Задание: вставьте пропущенные буквы</p>
      <p>Если все правильно - откроется новое слово</p>

      <div v-if="task" class="fill-empty__task">
        <div v-for="(v, i) in task[currentId].lesson" :key="i">
          <input
            maxlength="1"
            v-if="v === '_'"
            class="fill-empty__input"
            @input="(e) => setChar(e, i, task[currentId].word)"
          />
          <div v-else class="fill-empty__char flex-center">{{ v }}</div>
        </div>
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

<style lang="scss">
.fill-empty {
  &__title {
    font-weight: 800;
  }
  &__task {
    width: 100%;
    margin: 40px 0;
    display: flex;
    flex-wrap: wrap;
  }

  &__char,
  &__input {
    background-color: #fff;
    border: 3px solid rgba($app-color, 0.2);
    border-radius: 4px;
    font-size: 28px;
    line-height: 32px;
    width: 50px;
    padding: 4px;
    margin: 4px;
  }

  &__input {
    color: orange;
  }

  &__input:focus {
    outline: none;
    border: 1px solid orange;
  }
}
</style>
