<template>
  <div class="wrapper">
    <h2>Доска для учителя</h2>
    <p>Привет, Аня и Костя! Отличной вам работы! Я с вами</p>

    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="creating" tab="Создание">
        <p>Выбери тип упражнения из выпадающего списка:</p>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            Упражнения <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/teacher/fill-empty/create">
                  "Заполни пробелы"
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/teacher/choose-translation/create">
                  "Выбери перевод"
                </router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-tab-pane>

      <a-tab-pane key="exercises" tab="Все упражнения" force-render>
        <a-list size="small" bordered :data-source="ids" v-if="ids">
          <template #renderItem="{ item }">
            <a-list-item>
              <router-link :to="`/teacher/${tasks[item].type}/edit/${item}`">
                {{
                  tasks[item].taskTitle ? tasks[item].taskTitle : "Упражнение"
                }}
              </router-link>
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>

      <a-tab-pane key="main-page" tab="Главная страница" force-render>
        <router-link to="/teacher/settings/videos">
          Настройка сетки видео
        </router-link>
      </a-tab-pane>

      <a-tab-pane key="logout" tab="Выход" force-render>
        <a-button type="primary" @click="logout">Выход</a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";

import { DownOutlined } from "@ant-design/icons-vue";

import { useTeacherStore } from "@/stores/teacher";

import { useRouter, useRoute } from "vue-router";

import { loadTasks } from "@/helpers/fbHelpers.js";

export default {
  components: { DownOutlined },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const activeKey = ref(route.params.tab);
    const tasks = ref(null);
    const ids = ref([]);

    const teacherStore = useTeacherStore();

    const teacher = computed(() => {
      return teacherStore.teacher;
    });

    onMounted(() => {
      if (teacher.value) {
        load();
      }
    });

    watch(
      () => route.params.tab,
      (val) => {
        if (!val) {
          return;
        }
        activeKey.value = val;
      }
    );

    watch(activeKey, () => {
      router.push(`/teacher/start/${activeKey.value}`);
    });

    async function load() {
      try {
        const response = await loadTasks("/tasks");
        if (response !== null) {
          tasks.value = response;
          ids.value = Object.keys(response);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // function getTasksBySection(name) {
    //   let array = [];
    //   onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     array = Object.keys(data[name]);
    //   });

    //   return array;
    // }

    function logout() {
      teacherStore.removeTeacher();
      router.push({ path: "/teacher/auth" });
    }

    return {
      logout,
      // getTasksBySection,
      tasks,
      ids,
      activeKey,
      DownOutlined,
      teacher,
    };
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
