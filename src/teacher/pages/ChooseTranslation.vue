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
    <div class="choose-translation">
      <div class="choose-translation__inputs">
        <a-input
          v-model:value="word"
          addon-before="слово"
          class="choose-translation__input"
        />
        <a-input
          v-model:value="translation"
          addon-before="перевод"
          class="choose-translation__input"
        />
        <a-button type="primary" @click="add">Добавить</a-button>
      </div>

      <div v-if="task.length > 0">
        <div v-for="(v, i) in task" :key="i" class="choose-translation__item">
          {{ v.word }}
          <MinusOutlined />
          {{ v.translation }}

          <a-button
            type="primary"
            @click="() => removeItem(i)"
            :style="{ margin: '10px 15px' }"
            >Удалить</a-button
          >
        </div>
      </div>
    </div>
  </TaskView>
</template>

<script>
import { computed, ref } from "vue";

import TaskView from "@/teacher/views/TaskView.vue";

import { useRoute, useRouter } from "vue-router";

import { MinusOutlined } from "@ant-design/icons-vue";

import { taskService } from "@/teacher/services/taskService.js";

export default {
  components: { TaskView, MinusOutlined },
  setup() {
    const word = ref("");
    const translation = ref("");
    const task = ref([]);

    const route = useRoute();
    const router = useRouter();

    const isEditMode = ref(route.params.action === "edit");

    const modalIsShowing = ref(false);
    const modalText = ref("");

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
      return task.value.length === 0;
    });

    function add() {
      task.value.push({ word: word.value, translation: translation.value });
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

      try {
        await taskService.save(
          payload,
          isEditMode.value,
          "/tasks",
          `/${id.value}`
        );

        router.push({ path: "/teacher/start/exercises" });
      } catch (e) {
        console.log(e);
      }
    }

    function deleteTask() {}

    function removeItem(idx) {
      const filtered = task.value.filter((v, i) => {
        i !== idx;
      });

      task.value = filtered;
    }

    // Это можно как то вытащить в TaskView ??
    // function showModal(text) {
    //   modalIsShowing.value = true;
    //   modalText.value = text;
    //   loadCurrentData();
    // }

    const modalSettings = computed(() => {
      return {
        modalIsShowing: modalIsShowing.value,
        modalText: modalText.value,
      };
    });

    return {
      removeItem,
      modalSettings,
      modalIsShowing,
      modalText,
      isLoading,
      currentData,
      add,
      save,
      deleteTask,
      word,
      translation,
      task,
      TaskView,
      cantSave,
      MinusOutlined,
    };
  },
};
</script>

<style lang="scss">
.choose-translation {
  &__inputs {
    display: flex;
    align-items: center;
  }

  &__input {
    margin-right: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
  }
}
</style>
