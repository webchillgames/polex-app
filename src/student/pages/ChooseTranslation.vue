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
    {{ currentWord }} {{ currentTranslation }}
    <div class="columns">
      <div class="column">
        <div v-for="(v, i) in editingTask" :key="i">
          <button
            @click="currentWord = i"
            class="button"
            :class="{ chosen: i === currentWord }"
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

    onMounted(loadTask);

    watch(currentTranslation, (v) => {
      if (task.value[currentWord.value].translation === v) {
        deleteChosenItems(v);

        correctAnswers.value = correctAnswers.value + 1;
      }
    });

    watch(correctAnswers, () => {
      currentWord.value = "";
      currentTranslation.value = "";
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
      const filtered = editingTask.value.filter(
        (_, i) => currentWord.value !== i
      );

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
  min-width: 100px;
  margin: 8px;
  color: #fff;
  flex-grow: 1;
  background: orange;
  border: none;
  padding: 8px;

  &:disabled {
    border-color: grey;
    background-color: grey;
  }
}

.chosen {
  background: #4676d7;
}
</style>
