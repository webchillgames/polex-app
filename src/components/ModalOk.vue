<template>
  <b-modal hide-header ok-only>
    <p class="my-4">{{ text }}</p>
  </b-modal>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

