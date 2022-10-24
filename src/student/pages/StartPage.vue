<template>
  <div class="start">
    <div class="start__top flex-center">
      <div class="wrapper start__title">Упражнения</div>
    </div>

    <ul class="start__list wrapper">
      <li v-for="(v, i) in ids" :key="i" class="start__item">
        <router-link :to="`/student/${tasks[v].type}/${v}`" class="start__link">
          <div>
            {{
              tasks[v].taskTitle ? tasks[v].taskTitle : "Упражнение " + (i + 1)
            }}
          </div>

          <div class="start__play flex-center">
            <font-awesome-icon icon="fa-solid fa-play" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import { loadTasks } from "@/helpers/fbHelpers.js";

export default {
  setup() {
    const tasks = ref(null);
    const ids = ref([]);

    onMounted(load);

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

    // const starCountRef = fbRef(fbDatabase, "/tasks");

    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   ids.value = Object.keys(data);
    //   tasks.value = data;
    // });

    return {
      tasks,
      ids,
    };
  },
};
</script>

<style lang="scss">
.start {
  &__title {
    color: $app-color;
    padding-bottom: 30px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 800;
  }

  &__top {
    background-color: $bg-light;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    box-shadow: 0 20px 20px rgba(#000, 10%);
  }

  &__list {
    list-style: none;
    margin: 0;
  }

  &__item {
    width: 100%;
  }

  &__play {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #fff;
  }

  &__link {
    padding: 16px;
    color: #fff;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    transition: color 0.5;
    display: flex;
    flex-shrink: 1;
    justify-content: space-between;
    align-items: center;
    // background-color: $app-color;
    border-radius: 30px;
    margin: 16px 0;
    background: linear-gradient(
      90deg,
      rgba(133, 81, 225, 1) 0%,
      rgba(81, 95, 225, 1) 35%,
      rgba(81, 177, 225, 1) 100%
    );

    &:hover {
      color: #fff;
      box-shadow: 0 0 5px 2px $app-color;
    }
  }
}

@media (min-width: 767px) {
  .start {
    &__item {
      width: 80%;
    }
  }
}
@media (min-width: 1023px) {
  .start {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__item {
      width: auto;
      margin: 8px;
    }
  }
}
</style>
