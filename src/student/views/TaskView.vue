<template>
  <p v-if="isDone"><TaskEnd /></p>

  <div class="wrapper task" v-else>
    <slot class="content"></slot>

    <div class="task__progress">
      <p>Прогресс выполнения упражнения:</p>
      <a-progress :percent="progress" v-if="length" strokeColor="#5b02f7" />
    </div>

    <!-- <div class="task__video" v-if="url">
      <p>
        Видео для прокачки скиллов. <br />
        Оно поможет лучше выполнить упражнение
      </p>
      <YoutubeFrame :url="url" :play="isPlay" @click="isPlay = true" />
    </div> -->
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
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-progress-text {
    color: #fff;
  }

  &__video {
    margin-top: 60px;
    padding: 16px;
    border-radius: 20px 20px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__progress {
    color: #fff;
    padding: 16px;
    border-radius: 20px;
    background: linear-gradient(
      90deg,
      rgba(133, 81, 225, 0.7427564775910365) 0%,
      rgba(81, 95, 225, 0.7035407913165266) 35%,
      rgba(81, 212, 225, 0.675529586834734) 100%
    );
  }
}
</style>
