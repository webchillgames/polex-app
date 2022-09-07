<template>
  <div class="wrapper">
    <h2 class="my-2">{{ title }}</h2>

    <p v-if="isLoading">Загрузка упражнения...</p>
    <b-card v-else header="Заполни пробелы">
      <b-card v-if="currentTask" header="Ваши слова">
        <div v-if="!currentTask.length">Все удалено</div>
        <div v-else>
          <b-card-text>
            Подсказка: Из этого списка можно только удалять
          </b-card-text>
          <b-table-simple>
            <b-thead head-variant="light">
              <b-tr>
                <b-th class="p-2">Отображаемое</b-th>
                <b-th class="p-2">Правильное</b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="currentTask.length">
              <b-tr v-for="(v, i) in currentTask" :key="i" class="p-2">
                <b-th>
                  {{ v.lesson }}
                </b-th>
                <b-th>
                  <div class="d-flex flex-row">
                    {{ v.word }}
                    <b-button
                      variant="outline-danger"
                      class="mx-3"
                      @click="() => removeItem(v.lesson)"
                      >Remove</b-button
                    >
                  </div>
                </b-th>
              </b-tr>
            </b-tbody>
            <b-tr v-else class="p-2">
              <font-awesome-icon icon="fa-solid fa-table" />
              Пока пусто
            </b-tr>
          </b-table-simple>
        </div>
      </b-card>

      <TaskInfo
        @updated="setInfo"
        class="my-2"
        :currentTitle="taskTitle"
        :currentLink="youtubeLink"
      />

      <YoutubeFrame v-if="youtubeLink" :url="youtubeLink" />

      <h3 class="my-3">Добавление новых слов</h3>
      <InfoCollapse
        :data="FILL_EMPTY_INFO"
        title="Как добавить слово"
        id="howAddWord"
      />

      <b-form @submit="submit">
        <b-form-textarea
          @keydown="keydown"
          id="textarea"
          v-model="textarea"
          placeholder="Вводи сюда слова..."
          rows="6"
          class="my-2"
        />

        <b-table-simple>
          <b-thead head-variant="light">
            <b-tr>
              <b-th class="p-2">Слова</b-th>
              <b-th class="p-2">Результат</b-th>
            </b-tr>
          </b-thead>
          <b-tbody v-if="task.length > 0">
            <b-tr v-for="(v, i) in task" :key="i" class="p-2">
              <b-th>
                <b-button
                  @click="() => hideChar(i, ci)"
                  v-for="(c, ci) in v.word"
                  :key="ci"
                  variant="outline-dark"
                  class="m-1"
                >
                  {{ c }}
                </b-button>
              </b-th>
              <b-th>
                <div class="d-flex flex-row">
                  <div v-for="(v, i) in v.lesson" :key="i" class="mx-1">
                    {{ v }}
                  </div>
                </div>
              </b-th>
            </b-tr>
          </b-tbody>
          <b-tr v-else class="p-2">
            <font-awesome-icon icon="fa-solid fa-table" />
            Пока пусто
          </b-tr>
        </b-table-simple>

        <b-button type="submit" variant="outline-primary"> Сохранить </b-button>
      </b-form>
    </b-card>
    <b-modal hide-header ok-only v-model="modalIsShowing">
      <p class="my-4">{{ modalText }}</p>
    </b-modal>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";
import router from "@/router";

import InfoCollapse from "@/components/InfoCollapse.vue";
import TaskInfo from "@/teacher/components/TaskInfo.vue";
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import { FILL_EMPTY_INFO } from "@/assets/tips.js";
import { fillEmptyService } from "@/teacher/services/fillEmptyService";

export default {
  components: { InfoCollapse, TaskInfo, YoutubeFrame },
  setup() {
    const route = useRoute();

    const textarea = ref("");
    const task = ref([]);

    const currentTask = ref(null);
    const id = ref(null);

    const isLoading = ref(route.params.action === "edit");

    const modalIsShowing = ref(false);
    const modalText = ref("");

    const youtubeLink = ref("");
    const taskTitle = ref("");

    const title =
      route.params.action === "create"
        ? "Создание нового упражнения"
        : "Редактирование упражнения";

    watch(textarea, (current) => {
      const array = current.split(" ").filter((v) => v !== "");
      task.value = array.map((v) => {
        return { word: v, lesson: v };
      });
    });

    async function loadCurrentData() {
      if (route.params.action !== "edit") {
        return;
      }

      id.value = route.params.id;
      try {
        const response = await fillEmptyService.fetchById(route.params.id);

        currentTask.value = response.data;
        youtubeLink.value = response.youtubeLink;
        taskTitle.value = response.taskTitle;
      } catch (e) {
        console.log("Не удалось загрузить данные о задании");
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    }

    function submit() {
      currentTask.value ? editTask() : createTask();
    }

    async function createTask() {
      try {
        await fillEmptyService.create({
          youtubeLink: youtubeLink.value,
          taskTitle: taskTitle.value,
          data: task.value,
        });
        showSuccessModal();
        router.push({ path: "/teacher/start" });
      } catch (e) {
        console.log(e);
      }
    }

    async function editTask() {
      const payload = {
        youtubeLink: youtubeLink.value,
        taskTitle: taskTitle.value,
        data: [
          ...(currentTask.value.length > 0 && currentTask.value),
          ...task.value,
        ],
      };

      try {
        await fillEmptyService.edit(id.value, payload);
        showSuccessModal();
      } catch (e) {
        console.log(e);
      }
    }

    function showSuccessModal() {
      modalIsShowing.value = true;
      modalText.value = "Успешно сохранено";
      textarea.value = "";
      loadCurrentData();
    }

    function keydown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }

    onMounted(loadCurrentData);

    function removeItem(lesson) {
      console.log(lesson);
      const filtered = currentTask.value.filter((v) => v.lesson !== lesson);

      console.log(filtered);
      currentTask.value = filtered;
    }

    // qwerty => q_ert_
    function hideChar(id, char) {
      task.value.map((v, i) => {
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
      keydown,
      title,
      isLoading,
      currentTask,
      id,
      hideChar,
      submit,
      task,
      textarea,
      removeItem,
      modalIsShowing,
      modalText,
      InfoCollapse,
      FILL_EMPTY_INFO,
      TaskInfo,
      setInfo,
      taskTitle,
      youtubeLink,
      YoutubeFrame,
    };
  },
};
</script>
