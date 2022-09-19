<template>
  <p v-if="isLoading">Загрузка упражнения...</p>
  <TaskView
    v-else
    @save="save"
    @delete-task="onDeleteTask"
    :isLoading="isLoading"
    :currentData="currentData"
    :cantSave="cantSave"
  >
    <p>2 шаг: Добавляй по одному слову</p>

    <a-textarea
      v-model:value="textarea"
      placeholder="Пиши тут..."
      @keydown="keydown"
      :auto-size="{ minRows: 1, maxRows: 2 }"
    />

    <a-button type="primary" @click="addNewWord" :style="{ margin: '10px 0' }">
      Добавить в список
    </a-button>

    <div v-if="finalList">
      <div
        v-for="(v, i) in finalList"
        :key="i"
        :style="{ display: 'flex', margin: '10px 0' }"
      >
        <a-button
          :style="{ display: 'flex', margin: '10px 5px' }"
          v-for="(c, j) in v.lesson"
          :key="j"
          @click="() => hideChar(i, j)"
        >
          {{ c }}
        </a-button>
        <a-button
          type="primary"
          @click="() => deleteItem(v.lesson)"
          :style="{ margin: '10px 15px' }"
          >Удалить</a-button
        >
      </div>
    </div>
  </TaskView>
</template>

<script>
import { computed, onMounted, ref } from "vue";

import { firebaseService } from "@/services/firebaseService.js";

import { useRoute } from "vue-router";

import TaskView from "@/teacher/views/TaskView.vue";

import { taskService } from "@/teacher/services/taskService.js";

import { useTasks } from "@/teacher/composables/useTasks.js";

export default {
  components: { TaskView },
  setup() {
    const route = useRoute();

    const { deleteTask, saveTask } = useTasks();

    const isEditMode = ref(route.params.action === "edit");

    const id = ref(null);

    const isLoading = ref(isEditMode.value);
    const finalList = ref([]);
    const textarea = ref("");
    const cantSave = computed(() => finalList.value.length === 0);

    const currentYoutubeLink = ref("");
    const currentTaskTitle = ref("");

    const currentData = computed(() => {
      return {
        currentYoutubeLink: currentYoutubeLink.value,
        currentTaskTitle: currentTaskTitle.value,
      };
    });

    onMounted(loadCurrentData);

    function addNewWord() {
      finalList.value.push({
        word: textarea.value,
        lesson: textarea.value,
      });

      textarea.value = "";
    }

    async function loadCurrentData() {
      if (route.params.action !== "edit") {
        return;
      }

      id.value = route.params.id;

      try {
        const response = await firebaseService.fetchById(id.value, "/tasks/");
        finalList.value = response.data;
        currentYoutubeLink.value = response.youtubeLink;
        currentTaskTitle.value = response.taskTitle;

        console.log(currentData.value);
      } catch (e) {
        console.log("Не удалось загрузить данные о задании");
      } finally {
        isLoading.value = false;
      }
    }

    async function save(data) {
      const payload = {
        type: "fill-empty",
        youtubeLink: data.youtubeLink,
        taskTitle: data.taskTitle,
        data: finalList.value,
      };

      await saveTask(payload, isEditMode.value, `/${id.value}`);
    }

    async function onDeleteTask() {
      await deleteTask(id.value);
    }

    function keydown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }

    function deleteItem(lesson) {
      const filtered = finalList.value.filter((v) => v.lesson !== lesson);
      finalList.value = filtered;
    }

    // qwerty => q_ert_
    function hideChar(id, char) {
      finalList.value.forEach((v, i) => {
        if (i === id) {
          const word = v.lesson.split("");
          word[char] = "_";

          if (v.lesson[char] === "_") {
            word[char] = v.word[char];
          }

          v.lesson = word.join("");
        }
      });
    }

    return {
      onDeleteTask,
      keydown,
      isLoading,
      id,
      hideChar,
      save,
      textarea,
      deleteItem,
      currentData,
      finalList,
      addNewWord,
      isEditMode,
      TaskView,
      cantSave,
      taskService,
    };
  },
};
</script>
