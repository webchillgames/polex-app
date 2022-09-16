<template>
  <p v-if="isLoading">Загрузка упражнения...</p>
  <TaskView
    v-else
    @save="save"
    @delete-task="deleteTask"
    :isLoading="isLoading"
    :modalSettings="modalSettings"
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
          @click="() => removeItem(v.lesson)"
          :style="{ margin: '10px 15px' }"
          >Удалить</a-button
        >
      </div>
    </div>
  </TaskView>
</template>

<script>
import { computed, onMounted, ref } from "vue";

import { useRoute } from "vue-router";
import router from "@/router";

import { firebaseService } from "@/services/firebaseService.js";

import TaskView from "@/teacher/views/TaskView.vue";

export default {
  components: { TaskView },
  setup() {
    const route = useRoute();

    const isEditMode = ref(route.params.action === "edit");

    const id = ref(null);

    const modalIsShowing = ref(false);
    const modalText = ref("");

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

    const modalSettings = computed(() => {
      return {
        modalIsShowing: modalIsShowing.value,
        modalText: modalText.value,
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

    function save(info) {
      isEditMode.value ? editTask(info) : createTask(info);
    }

    async function createTask(info) {
      try {
        await firebaseService.create(
          {
            type: "fill-empty",
            youtubeLink: info.youtubeLink,
            taskTitle: info.taskTitle,
            data: finalList.value,
          },
          "/tasks"
        );
        showModal("Успешно сохранено");
        router.push({ path: "/teacher/start" });
      } catch (e) {
        console.log(e);
        showModal("Что то пошло не так упс");
      }
    }

    async function editTask(info) {
      const payload = {
        type: "fill-empty",
        youtubeLink: info.youtubeLink,
        taskTitle: info.taskTitle,
        data: finalList.value,
      };

      try {
        await firebaseService.edit(id.value, payload, "/tasks/");
        showModal("Успешно сохранено");
      } catch (e) {
        showModal("Что то пошло не так упс");
        console.log(e);
      }
    }

    async function deleteTask() {
      try {
        await firebaseService.delete(id.value, "/tasks/");
        showModal("Успешно удалено");
        router.push({ path: "/teacher/start" });
      } catch (e) {
        console.log(e);
      }
    }

    // Это можно как то вытащить в TaskView ??
    function showModal(text) {
      modalIsShowing.value = true;
      modalText.value = text;
      loadCurrentData();
    }

    function keydown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }

    function removeItem(lesson) {
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
      deleteTask,
      keydown,
      isLoading,
      id,
      hideChar,
      save,
      textarea,
      removeItem,
      modalIsShowing,
      modalText,
      modalSettings,
      currentData,
      finalList,
      addNewWord,
      isEditMode,
      TaskView,
      cantSave,
    };
  },
};
</script>
