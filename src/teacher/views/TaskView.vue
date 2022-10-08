<template>
  <div class="task-view">
    <h2 class="my-2">{{ taskMode }}</h2>

    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Добавление описания">
        <p>
          1 шаг: Заполни поля, если хочешь, они не являются обязательными.
          Результат сохраняется автоматически
        </p>

        <a-input
          v-model:value="taskTitle"
          placeholder="Название задания"
          :style="{
            margin: '10px 0',
          }"
        />
        <a-input
          v-model:value="youtubeLink"
          placeholder="Ссылка на youtube ролик"
          :style="{
            margin: '10px 0',
          }"
        />

        <InfoCollapse
          :data="YOTUBE_LINK_INFO"
          title="Где взять ссылку"
          id="howGetLink"
          :style="{
            margin: '20px 0',
          }"
        />

        <YoutubeFrame
          v-if="youtubeLink"
          :url="youtubeLink"
          :play="isPlay"
          @click="isPlay = true"
        />
      </a-tab-pane>

      <a-tab-pane key="2" tab="Добавление упражнения" class="task-view__step">
        <slot />

        <a-button
          type="primary"
          @click="save"
          :disabled="cantSave"
          :style="{
            margin: '10px 10px 10px 0',
          }"
        >
          Сохранить упражнение
        </a-button>

        <a-button
          v-if="isEditMode"
          @click="deleteTask"
          :style="{
            margin: '10px 0',
          }"
        >
          Удалить упражнение
        </a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref } from "vue";

import InfoCollapse from "@/components/InfoCollapse.vue";
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import { YOTUBE_LINK_INFO } from "@/assets/tips.js";

import { useRoute } from "vue-router";

export default {
  emits: ["save", "deleteTask"],
  components: { InfoCollapse, YoutubeFrame },
  props: {
    currentData: {
      type: Object || null,
      required: true,
    },
    cantSave: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, ctx) {
    const route = useRoute();

    const activeKey = ref("1");
    const isPlay = ref(false);

    const taskTitle = ref(props.currentData.currentTaskTitle || "");
    const youtubeLink = ref(props.currentData.currentYoutubeLink || "");

    const taskMode =
      route.params.action === "create"
        ? "Создание нового упражнения"
        : "Редактирование упражнения";

    const isEditMode = ref(route.params.action === "edit");

    function save() {
      ctx.emit("save", {
        youtubeLink: youtubeLink.value,
        taskTitle: taskTitle.value,
      });
    }

    function deleteTask() {
      ctx.emit("deleteTask");
    }

    return {
      deleteTask,
      isEditMode,
      save,
      isPlay,
      taskTitle,
      taskMode,
      youtubeLink,
      activeKey,
      InfoCollapse,
      YOTUBE_LINK_INFO,
      YoutubeFrame,
    };
  },
};
</script>
