<template>
  <a-collapse :accordion="true">
    <a-collapse-panel :header="title">
      <div v-for="(v, i) in data" :key="i">
        <font-awesome-icon icon="fa-solid fa-hand" />
        {{ v }}
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>
