<template>
  <div>
    <b-input-group prepend="Название задания" class="mb-2">
      <b-form-input aria-label="Task title" v-model="title" />
    </b-input-group>

    <b-input-group prepend="Ссылка на youtube ролик" class="mb-2">
      <b-form-input aria-label="youtube link" v-model="link" />
    </b-input-group>

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
