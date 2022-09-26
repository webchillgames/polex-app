<template>
  <p v-if="isDone"><TaskEnd /></p>

  <div class="wrapper task" v-else>
    <slot></slot>

    <div class="task__progress">
      <p>Прогресс выполнения упражнения:</p>
      <a-progress :percent="progress" v-if="length" />
    </div>

    <div class="task__video">
      <p>
        Видео для прокачки скиллов. <br />
        Оно поможет лучше выполнить упражнение
      </p>
      <YoutubeFrame
        v-if="url"
        :url="url"
        :play="isPlay"
        @click="isPlay = true"
      />
    </div>
  </div>
</template>

<script>
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import { computed, ref } from "vue";

import TaskEnd from "@/student/components/TaskEnd.vue";

export default {
  components: { YoutubeFrame, TaskEnd },
  props: {
    url: {
      type: String,
      required: false,
    },
    currentId: {
      type: Number,
      required: false,
    },
    length: {
      type: Number,
      required: false,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const isPlay = ref(false);

    const progress = computed(() => {
      return Math.ceil((props.currentId * 100) / props.length);
    });

    return {
      progress,
      isPlay,
    };
  },
};
</script>

<style lang="scss">
.task {
  &__video {
    margin-top: 60px;
    padding: 16px;
    border: 1px solid rgba(#ccc, 0.7);
    border-radius: 20px 20px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__progress {
    margin: 40px 0;
  }
}
</style>
