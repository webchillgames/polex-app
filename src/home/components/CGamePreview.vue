<template>
  <div class="c-game-preview">
    <img :src="link" alt="игра" />
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.c-game-preview {
  margin: 8px;

  img {
    border-radius: 8px;
    height: auto;
    width: 130px;
    object-fit: cover;
  }
}

@media (min-width: 767px) {
  .c-game-preview {
    img {
      border-radius: 16px;
      width: 200px;
    }
  }
}
</style>
