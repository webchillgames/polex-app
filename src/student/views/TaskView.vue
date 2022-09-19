<template>
  <p v-if="isDone">Задание выполнено! Отличная работа</p>

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

export default {
  components: { YoutubeFrame },
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
