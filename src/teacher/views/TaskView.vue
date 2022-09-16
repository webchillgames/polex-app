<template>
  <TeacherView>
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
            addon-before="Название задания"
            :style="{
              margin: '10px 0',
            }"
          />
          <a-input
            v-model:value="youtubeLink"
            addon-before="Ссылка на youtube ролик"
            :style="{
              margin: '10px 0',
            }"
          />

          <InfoCollapse
            :data="YOTUBE_LINK_INFO"
            title="Где взять ссылку"
            id="howGetLink"
          />

          <YoutubeFrame
            v-if="youtubeLink"
            :url="youtubeLink"
            :play="isPlay"
            @click="isPlay = true"
          />
        </a-tab-pane>

        <a-tab-pane key="2" tab="Добавление упражнения">
          <slot></slot>

          <a-button
            type="primary"
            @click="save"
            :disabled="cantSave"
            class="task-view__button"
          >
            Сохранить упражнение
          </a-button>

          <a-button
            v-if="isEditMode"
            @click="deleteTask"
            class="task-view__button"
          >
            Удалить упражнение
          </a-button>
        </a-tab-pane>
      </a-tabs>

      <ModalOk v-model="modalIsShowing" :text="modalText" />
    </div>
  </TeacherView>
</template>

<script>
import { computed, ref } from "vue";

import TeacherView from "@/teacher/views/TeacherView.vue";
import InfoCollapse from "@/components/InfoCollapse.vue";
import YoutubeFrame from "@/components/YoutubeFrame.vue";
import ModalOk from "@/components/ModalOk.vue";

import { YOTUBE_LINK_INFO } from "@/assets/tips.js";

import { useRoute } from "vue-router";

export default {
  emits: ["save", "deleteTask"],
  components: { TeacherView, InfoCollapse, YoutubeFrame, ModalOk },
  props: {
    modalSettings: {
      type: Object,
      required: true,
    },
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
    const taskTitle = ref(props.currentData.currentTaskTitle || "");
    const youtubeLink = ref(props.currentData.currentYoutubeLink || "");
    const isPlay = ref(false);

    const modalIsShowing = computed(() => {
      return props.modalSettings.modalIsShowing;
    });

    const modalText = computed(() => props.modalSettings.modalText);
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
      TeacherView,
      InfoCollapse,
      YOTUBE_LINK_INFO,
      YoutubeFrame,
      modalIsShowing,
      ModalOk,
      modalText,
    };
  },
};
</script>

<style lang="scss">
.task-view {
  &__button {
    margin: 30px 0;
  }
}

.task-view__button + .task-view__button {
  margin-left: 30px;
}
</style>
