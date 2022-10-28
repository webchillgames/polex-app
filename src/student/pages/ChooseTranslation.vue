<template>
  <p v-if="isLoading">Загрузка упражнения...</p>
  <TaskView
    :url="url"
    :currentId="correctAnswers"
    :length="task.length"
    :isDone="isDone"
    v-else
  >
    <h3>Соедини слово и его перевод</h3>
    <!-- <div>
      Подсказка:
      <p v-if="!currentWord && !currentTranslation">
        Выбери слово из первого столбца
      </p>
      <p v-if="currentWord && !currentTranslation">
        Выбери его перевод из второго столбца
      </p>
      <p v-if="currentWord && currentTranslation">
        Если ответ правильный - слова исчезнут. Если нет - попробуй выбрать
        другой перевод
      </p>
    </div> -->

    <div class="columns">
      <div class="column">
        <div v-for="(v, i) in editingTask" :key="i">
          <button
            @click="currentWord = v"
            class="button"
            :class="{ chosen: v === currentWord }"
          >
            {{ v.word }}
          </button>
        </div>
      </div>

      <div class="column">
        <div v-for="(v, i) in translations" :key="i">
          <button
            @click="currentTranslation = v"
            class="button"
            :class="{ chosen: v === currentTranslation }"
            :disabled="currentWord === ''"
          >
            {{ v }}
          </button>
        </div>
      </div>
    </div>
  </TaskView>
</template>

<script>
import TaskView from "@/student/views/TaskView.vue";

import { computed, onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";

import { firebaseService } from "@/services/firebaseService.js";

export default {
  components: { TaskView },

  setup() {
    const isLoading = ref(true);
    const isDone = computed(() => {
      return correctAnswers.value === task.value.length;
    });
    const route = useRoute();

    // original array
    const task = ref([]);
    // copy
    const editingTask = ref([]);
    const translations = ref([]);

    const correctAnswers = ref(0);
    const url = ref("");
    const title = ref("");

    const currentWord = ref(null);
    const currentTranslation = ref(null);

    const userChosenBothWords = computed(
      () => currentWord.value && currentTranslation.value
    );

    onMounted(loadTask);

    watch(userChosenBothWords, (v) => {
      if (!v) {
        return;
      }

      if (currentWord.value.translation === currentTranslation.value) {
        setTimeout(() => {
          deleteChosenItems(currentWord.value);
          correctAnswers.value = correctAnswers.value + 1;
          currentWord.value = null;
          currentTranslation.value = null;
        }, 500);
      }
    });

    function shuffleTranslations() {
      const array = task.value.map((v) => {
        return v.translation;
      });

      let oldEl;
      for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldEl = array[i];
        array[i] = array[rand];
        array[rand] = oldEl;
      }

      translations.value = array;
    }

    function deleteChosenItems() {
      const filtered = editingTask.value.filter((v) => currentWord.value !== v);

      const filteredTranslations = translations.value.filter(
        (t) => t !== currentTranslation.value
      );

      translations.value = filteredTranslations;
      editingTask.value = filtered;
    }

    async function loadTask() {
      try {
        const res = await firebaseService.fetchById(route.params.id, "/tasks/");

        task.value = res.data;
        shuffleTranslations();
        editingTask.value = res.data;
        title.value = res.taskTitle;
        url.value = res.youtubeLink;
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    }

    return {
      url,
      task,
      editingTask,
      translations,
      TaskView,
      isDone,
      isLoading,
      currentWord,
      currentTranslation,
      correctAnswers,
    };
  },
};
</script>

<style lang="scss">
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.column {
  display: flex;
  flex-direction: column;
}

.button {
  font-size: 18px;
  line-height: 20px;
  font-weight: 800;
  margin: 8px;
  color: $app-color;
  flex-grow: 1;
  background: #fff;
  border: 5px solid $app-color;
  border-radius: 10px;
  padding: 8px 16px;

  &:disabled {
    border-color: grey;
    background-color: grey;
  }
}

.chosen {
  background-color: $app-color;
  color: #fff;
}
</style>
