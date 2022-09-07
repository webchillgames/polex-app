<template>
  <div class="wrapper">
    <p v-if="isLoading">Загрузка упражнения...</p>
    <b-card v-else-if="isDone">Задание выполнено</b-card>
    <b-card v-else header="Задание: вставьте пропущенные буквы">
      <b-card-text v-if="title">{{ title }}</b-card-text>

      <InfoCollapse
        :data="FILL_EMPTY_INFO_STUDENT"
        title="Инструкция"
        id="howDoIt"
      />
      <b-card-text
        >Прогресс: {{ currentId + 1 }} / {{ task.length }}</b-card-text
      >
      <b-card>
        <div class="d-flex flex-row">
          <div
            v-for="(v, i) in task[currentId].lesson"
            :key="i"
            class="d-flex flex-row"
          >
            <input
              v-if="v === '_'"
              class="input"
              @input="(e) => setChar(e, i, task[currentId].word)"
            />
            <span v-else class="item d-flex flex-row">{{ v }}</span>
          </div>
        </div>
      </b-card>
      <YoutubeFrame v-if="url" :url="url" />
    </b-card>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";

import { useRoute } from "vue-router";
import { fbDatabase, fbRef } from "@/firebase";

import { onValue } from "firebase/database";

import { FILL_EMPTY_INFO_STUDENT } from "@/assets/tips.js";

import InfoCollapse from "@/components/InfoCollapse.vue";
import YoutubeFrame from "@/components/YoutubeFrame.vue";

export default {
  components: { InfoCollapse, YoutubeFrame },
  setup() {
    const route = useRoute();
    const task = ref([]);
    const currentId = ref(0);
    const url = ref("");
    const title = ref("");

    const comparedItem = computed(() => task.value[currentId.value].lesson);

    const isLoading = ref(true);
    const isDone = ref(false);

    function loadTask() {
      const starCountRef = fbRef(fbDatabase, "/tasks/" + route.params.id);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        task.value = data.data;
        isLoading.value = false;
        title.value = data.taskTitle;
      });
    }

    function setChar(e, i, rightWord) {
      let result = comparedItem.value;
      console.log(result);

      result = `${result.slice(0, i)}${e.target.value}${result.slice(i + 1)}`;

      if (result === rightWord) {
        setTimeout(() => {
          if (currentId.value === task.value.length - 1) {
            isDone.value = true;
          } else {
            currentId.value = currentId.value + 1;
            e.target.value = "";
          }
        }, 1000);
      }
    }

    onMounted(loadTask);

    return {
      url,
      setChar,
      task,
      isLoading,
      currentId,
      isDone,
      InfoCollapse,
      FILL_EMPTY_INFO_STUDENT,
      YoutubeFrame,
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  min-width: 30px;
  align-items: center;
  justify-content: center;
}

.input {
  width: 30px;
}

.item,
.input {
  margin-right: 2px;
  padding: 10px 5px;
  border: 1px solid #000;
}
</style>
