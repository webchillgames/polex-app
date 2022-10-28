<template>
  <p v-if="isLoading">Загрузка упражнения...</p>
  <TaskView
    :url="url"
    :currentId="count"
    :length="task.length"
    :isDone="isDone"
    v-else
    class="fill-empty"
  >
    <div>
      <h2 v-if="title" class="fill-empty__title">{{ title }}</h2>
      <p>Задание: вставьте пропущенные буквы</p>
      <p>Подсказка: Если все правильно - откроется новое слово</p>
    </div>

    <div v-if="task" class="fill-empty__task-wrapper flex-center">
      <div>
        <div class="fill-empty__items">
          <div
            v-for="(v, i) in task[count].lesson"
            :key="i"
            class="fill-empty__item"
          >
            <input
              maxlength="1"
              v-if="v === '_'"
              class="fill-empty__input"
              @input="(e) => setChar(e, i, task[count].word)"
            />
            <span v-else class="fill-empty__char flex-center">{{ v }}</span>
          </div>
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
    const count = ref(0);

    const url = ref("");
    const title = ref("");
    const comparedItem = ref("");

    const isLoading = ref(true);
    const isDone = ref(false);

    async function loadTask() {
      try {
        const res = await firebaseService.fetchById(route.params.id, "/tasks/");

        comparedItem.value = res.data[count.value].lesson;
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
      if (e.target.value === "") {
        return;
      }

      const editedWord = comparedItem.value.split(""); // ['ż', 'ó', 'ł', '_', 'y']
      editedWord[i] = e.target.value; // ['ż', 'ó', 'ł', i, 'y']
      comparedItem.value = editedWord.join(""); // (if i === 'D') =>  'żółDy'

      // 'żółDy' === 'żółty'
      // если ответ правильный
      if (comparedItem.value.toLowerCase() === rightWord.toLowerCase()) {
        setTimeout(() => {
          // и если это был последний ход
          if (count.value === task.value.length - 1) {
            isDone.value = true;
          } else {
            count.value = count.value + 1;
            // подставляем следующее слово
            comparedItem.value = task.value[count.value].lesson;
            // чистим инпуты
            const inputs = document.querySelectorAll("input");
            inputs.forEach((v) => {
              v.value = "";
            });
          }
        }, 1000);
      }

      // но если ответ неверный, то просто ничего не делаем
    }

    onMounted(loadTask);

    return {
      url,
      setChar,
      task,
      isLoading,
      count,
      isDone,
      FILL_EMPTY_INFO_STUDENT,
      TaskView,
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.fill-empty {

  &__item {
    display: inline-block;
  }

  &__title {
    font-weight: 800;
  }

  &__task-wrapper {
    flex-grow: 1;
    display: flex;
    padding: 8px;
    border: 4px solid $bg-light;
    border-radius: 20px;
    margin: 8px 0;
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

  &__input:focus {
    outline: none;
    border-color: $app-color;
  }
}
</style>
