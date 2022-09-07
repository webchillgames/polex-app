<template>
  <div class="wrapper" v-if="loginedTeacher">
    <h2>Доска для учителя</h2>

    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Создание">
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
            </a-menu>
          </template>
        </a-dropdown>
      </a-tab-pane>

      <a-tab-pane key="2" tab="Все упражнения" force-render>
        <a-list size="small" bordered :data-source="ids">
          <template #renderItem="{ item }">
            <a-list-item>
              <router-link :to="`/teacher/${tasks[item].type}/edit/${v}`">
                {{ tasks[item].taskTitle }}
              </router-link>
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>
      <!-- <a-tab-pane key="3" tab="Студенты"> На будущее... </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";

import fbService from "@/services/fbService.js";

import { DownOutlined } from "@ant-design/icons-vue";

import { useTeacherStore } from "@/stores/teacher";

export default {
  components: { DownOutlined },
  setup() {
    const activeKey = ref("1");
    const tasks = ref(null);

    const ids = ref([]);

    const teacherStore = useTeacherStore();
    const loginedTeacher = computed(() => {
      return teacherStore.teacher;
    });

    // onMounted(loadTasks);

    // async function loadTasks() {
    //   try {
    //     const response = await fbService.fetchList("/tasks");
    //     console.log(response);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // const starCountRef = fbRef(fbDatabase, "/tasks");

    // onValue(starCountRef, (snapshot) => {
    //   ids.value = Object.keys(snapshot.val());
    //   tasks.value = snapshot.val();
    // });

    // function getTasksBySection(name) {
    //   let array = [];
    //   onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     array = Object.keys(data[name]);
    //   });

    //   return array;
    // }

    return {
      // getTasksBySection,
      tasks,
      ids,
      activeKey,
      DownOutlined,
      loginedTeacher,
    };
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
