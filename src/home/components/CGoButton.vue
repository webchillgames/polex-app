<template>
  <div class="c-go-button">
    <router-link :to="rLink" v-if="rLink" class="c-go-button__link">
      <span class="c-go-button__title">{{ title }}</span>

      <font-awesome-icon
        icon="fa-solid fa-arrow-right"
        class="c-go-button__icon"
      />
    </router-link>

    <a :href="aHref" v-else class="c-go-button__link"
      ><span class="c-go-button__title">{{ title }}</span>

      <font-awesome-icon icon="fa-solid fa-arrow-right"
    /></a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    rLink: {
      type: String,
      required: false,
    },
    aHref: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.c-go-button {
  display: flex;
  color: #fff;

  &__icon {
    color: #fff;
  }

  &__link {
    background-color: $app-color;
    padding: 16px;
    font-weight: 800;
    font-size: 18px;
    line-height: 24px;
    margin: 10px 0;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: rgba($app-color, 50%);
      transform: scale(1.05);
    }

    &:active {
      background-color: rgba($app-color, 90%);
      transform: scale(0.95);
    }
  }

  &__title {
    color: #fff;
    margin-right: 8px;
  }
}
</style>
