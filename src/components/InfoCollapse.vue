<template>
  <div>
    <b-button v-b-toggle="`${id}`" class="my-2" variant="outline-primary">
      {{ title }}
      <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </b-button>

    <b-collapse :id="id">
      <b-list-group>
        <b-list-group-item v-for="(v, i) in data" :key="i">
          {{ v }}
        </b-list-group-item>
      </b-list-group>
    </b-collapse>
  </div>
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
