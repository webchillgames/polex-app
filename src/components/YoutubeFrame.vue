<template>
  <div>
    <b-card-text class="my-2">
      Видео урок, который поможет разобраться
    </b-card-text>
    <iframe
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${url}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>
