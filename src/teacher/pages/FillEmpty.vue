<template>
  <TeacherView>
    <div class="wrapper">
      <h2 class="my-2">{{ title }}</h2>
      <p v-if="isLoading">Загрузка упражнения...</p>

      <a-tabs v-model:activeKey="activeKey" v-else>
        <a-tab-pane key="1" tab="Добавление описания">
          <p>
            1 шаг: Заполни поля, если хочешь, они не являются обязательными.
            Результат сохраняется автоматически
          </p>
          <TaskInfo
            @updated="setInfo"
            class="my-2"
            :currentTitle="taskTitle"
            :currentLink="youtubeLink"
          />

          <YoutubeFrame v-if="youtubeLink" :url="youtubeLink" />
        </a-tab-pane>

        <a-tab-pane key="2" tab="Добавление новых слов">
          <p>2 шаг: Добавляй по одному слову</p>

          <a-textarea
            v-model:value="textarea"
            placeholder="Пиши тут..."
            @keydown="keydown"
            :auto-size="{ minRows: 1, maxRows: 2 }"
          />

          <a-button
            type="primary"
            @click="addNewWord"
            :style="{ margin: '10px 0' }"
            >Добавить в список</a-button
          >

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

          <a-button type="primary" @click="submit" :style="{ margin: '10px 0' }"
            >Сохранить упражнение</a-button
          >
        </a-tab-pane>
      </a-tabs>

      <a-button
        v-if="isEditMode"
        @click="deleteTask"
        :style="{ margin: '10px 0' }"
        >Удалить упражнение</a-button
      >
      <ModalOk v-model="modalIsShowing" :text="modalText" />
    </div>
  </TeacherView>
</template>

<script>
import { onMounted, ref } from "vue";

import { useRoute } from "vue-router";
import router from "@/router";

import InfoCollapse from "@/components/InfoCollapse.vue";
import TaskInfo from "@/teacher/components/TaskInfo.vue";
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import TeacherView from "../views/TeacherView.vue";

import { fillEmptyService } from "@/teacher/services/fillEmptyService";

import ModalOk from "@/components/ModalOk.vue";

export default {
  components: { TaskInfo, YoutubeFrame, TeacherView, ModalOk },
  setup() {
    const route = useRoute();

    const isEditMode = ref(route.params.action === "edit");
    const isLoading = ref(isEditMode.value);

    const title =
      route.params.action === "create"
        ? "Создание нового упражнения"
        : "Редактирование упражнения";

    const activeKey = ref("1");

    const textarea = ref("");
    const id = ref(null);

    const modalIsShowing = ref(false);
    const modalText = ref("");

    const youtubeLink = ref("");
    const taskTitle = ref("");

    const finalList = ref([]);

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
        const response = await fillEmptyService.fetchById(route.params.id);

        finalList.value = response.data;
        youtubeLink.value = response.youtubeLink;
        taskTitle.value = response.taskTitle;
      } catch (e) {
        console.log("Не удалось загрузить данные о задании");
      } finally {
        isLoading.value = false;
      }
    }

    function submit() {
      isEditMode.value ? editTask() : createTask();
    }

    async function createTask() {
      try {
        await fillEmptyService.create({
          youtubeLink: youtubeLink.value,
          taskTitle: taskTitle.value,
          data: finalList.value,
        });
        showModal("Успешно сохранено");
        router.push({ path: "/teacher/start" });
      } catch (e) {
        console.log(e);
      }
    }

    async function editTask() {
      const payload = {
        youtubeLink: youtubeLink.value,
        taskTitle: taskTitle.value,
        data: finalList.value,
      };

      try {
        await fillEmptyService.edit(id.value, payload);
        showModal("Успешно сохранено");
      } catch (e) {
        console.log(e);
      }
    }

    async function deleteTask() {
      try {
        await fillEmptyService.delete(id.value);
        showModal("Успешно удалено");
        router.push({ path: "/teacher/start" });
      } catch (e) {
        console.log(e);
      }
    }

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

    onMounted(loadCurrentData);

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

    function setInfo(data) {
      youtubeLink.value = data.youtubeLink;
      taskTitle.value = data.taskTitle;
    }

    return {
      deleteTask,
      keydown,
      title,
      isLoading,
      id,
      hideChar,
      submit,
      textarea,
      removeItem,
      modalIsShowing,
      modalText,
      InfoCollapse,
      TaskInfo,
      setInfo,
      taskTitle,
      youtubeLink,
      YoutubeFrame,
      TeacherView,
      activeKey,
      finalList,
      addNewWord,
      isEditMode,
      ModalOk,
    };
  },
};
</script>
