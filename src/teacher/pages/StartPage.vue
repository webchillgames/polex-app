<template>
  <div class="wrapper">
    <h2>Доска для учителя</h2>

    <b-tabs content-class="mt-3">
      <b-tab title="Создание" active>
        <b-card header="Создать новое упражнение">
          <b-card-text>Выбери тип упражнения из выпадающего списка</b-card-text>
          <b-dropdown
            variant="outline-primary"
            text="Упражнения"
            class="m-2"
            size="lg"
            offset="-2"
          >
            <b-dropdown-item>
              <router-link
                to="/teacher/fill-empty/create"
                class="link link-dark"
              >
                "Заполни пробелы"
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-card>
      </b-tab>

      <b-tab title="Все упражнения">
        <b-card header="Список упражнений" v-if="tasks">
          <ul>
            <li v-for="(v, i) in ids" :key="i">
              <router-link :to="`/teacher/${tasks[v].type}/edit/${v}`">
                {{ tasks[v].taskTitle }}
              </router-link>
            </li>
          </ul>
        </b-card>

        <b-card v-else>Пока пусто...</b-card>
      </b-tab>
      <b-tab title="Студенты" disabled> список студентов ага </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import { onValue } from "firebase/database";
import { fbDatabase, fbRef } from "@/firebase";

export default {
  setup() {
    const tasks = ref(null);
    const sections = ref([]);
    const ids = ref([]);

    const starCountRef = fbRef(fbDatabase, "/tasks");

    onValue(starCountRef, (snapshot) => {
      ids.value = Object.keys(snapshot.val());
      tasks.value = snapshot.val();
    });

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
      sections,
      tasks,
      ids,
    };
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
