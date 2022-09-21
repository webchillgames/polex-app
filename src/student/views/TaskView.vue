<template>
  <p v-if="isDone"><TaskEnd /></p>

  <div class="wrapper" v-else>
    <slot></slot>
    <a-progress :percent="progress" v-if="length" />
    <YoutubeFrame
      v-if="url"
      :url="url"
      :style="{ margin: '20px 0' }"
      :play="isPlay"
      @click="isPlay = true"
    />
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

<style></style>
