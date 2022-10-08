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
    <div>
      <a-input
        v-model:value="word"
        placeholder="Слово"
        :style="{
          margin: '10px 0',
        }"
      />
      <a-input
        v-model:value="translation"
        placeholder="Перевод"
        :style="{
          margin: '10px 0',
        }"
      />
      <a-button
        type="primary"
        @click="add"
        :style="{
          margin: '20px 0',
        }"
        >Добавить</a-button
      >
    </div>

    <div v-if="finalList.length > 0">
      <div v-for="(v, i) in finalList" :key="i">
        {{ v.word }}
        <MinusOutlined />
        {{ v.translation }}

        <a-button
          type="primary"
          @click="() => deleteItem(i)"
          :style="{ margin: '10px 15px' }"
          >Удалить</a-button
        >
      </div>
    </div>
  </TaskView>
</template>

<script>
import { computed, onMounted, ref } from "vue";

import TaskView from "@/teacher/views/TaskView.vue";

import { useRoute } from "vue-router";

import { MinusOutlined } from "@ant-design/icons-vue";

import { useTasks } from "@/teacher/composables/useTasks.js";

import { firebaseService } from "@/services/firebaseService.js";

export default {
  components: { TaskView, MinusOutlined },
  setup() {
    const { deleteTask, saveTask } = useTasks();
    const word = ref("");
    const translation = ref("");

    const route = useRoute();

    const isEditMode = ref(route.params.action === "edit");

    const id = ref(null);

    const finalList = ref([]);

    const currentYoutubeLink = ref("");
    const currentTaskTitle = ref("");

    const isLoading = ref(isEditMode.value);

    const currentData = computed(() => {
      return {
        currentYoutubeLink: currentYoutubeLink.value,
        currentTaskTitle: currentTaskTitle.value,
      };
    });

    const cantSave = computed(() => {
      return finalList.value.length === 0;
    });

    onMounted(loadCurrentData);

    function add() {
      finalList.value.push({
        word: word.value,
        translation: translation.value,
      });
      word.value = "";
      translation.value = "";
    }

    async function save(data) {
      const payload = {
        type: "choose-translation",
        youtubeLink: data.youtubeLink,
        taskTitle: data.taskTitle,
        data: finalList.value,
      };

      await saveTask(payload, isEditMode.value, `/${id.value}`);
    }

    async function onDeleteTask() {
      await deleteTask(id.value);
    }

    function deleteItem(idx) {
      const filtered = finalList.value.filter((_, i) => i !== idx);
      finalList.value = filtered;
    }

    async function loadCurrentData() {
      if (route.params.action !== "edit") {
        return;
      }

      id.value = route.params.id;

      try {
        const response = await firebaseService.fetchById(id.value, "/tasks/");
        console.log(response);
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

    return {
      deleteItem,
      isLoading,
      currentData,
      add,
      save,
      onDeleteTask,
      word,
      translation,
      finalList,
      TaskView,
      cantSave,
      MinusOutlined,
    };
  },
};
</script>
