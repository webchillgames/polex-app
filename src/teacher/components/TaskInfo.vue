<template>
  <div>
    <a-input
      v-model:value="title"
      addon-before="Название задания"
      :style="{
        margin: '10px 0',
      }"
    />
    <a-input
      v-model:value="link"
      addon-before="Ссылка на youtube ролик"
      :style="{
        margin: '10px 0',
      }"
    />

    <InfoCollapse
      :data="YOTUBE_LINK_INFO"
      title="Где взять ссылку"
      id="howGetLink"
    />
  </div>
</template>

<script>
import InfoCollapse from "@/components/InfoCollapse.vue";

import { YOTUBE_LINK_INFO } from "@/assets/tips.js";

import { onMounted, ref, watch } from "vue";

export default {
  components: { InfoCollapse },
  emits: ["updated"],
  props: {
    currentTitle: {
      type: String,
      required: false,
      default: "",
    },
    currentLink: {
      type: String,
      required: false,
      default: "",
    },
  },

  setup(props, ctx) {
    const title = ref("");
    const link = ref("");

    function setCurrentInfo() {
      if (props.currentTitle !== "") {
        title.value = props.currentTitle;
      }
      if (props.currentLink !== "") {
        link.value = props.currentLink;
      }
    }

    watch(title, () => {
      setTaskInfo();
    });

    watch(link, () => {
      setTaskInfo();
    });

    onMounted(setCurrentInfo);

    function setTaskInfo() {
      const info = {
        taskTitle: title.value,
        youtubeLink: link.value,
      };
      ctx.emit("updated", info);
    }

    return {
      setTaskInfo,
      title,
      link,
      InfoCollapse,
      YOTUBE_LINK_INFO,
    };
  },
};
</script>
