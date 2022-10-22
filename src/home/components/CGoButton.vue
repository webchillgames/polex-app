<template>
  <div class="c-go-button">
    <router-link :to="rLink" v-if="rLink">
      <span class="c-go-button__title">{{ title }}</span>
    </router-link>

    <a :href="aHref" v-else
      ><span class="c-go-button__title">{{ title }}</span></a
    >

    <font-awesome-icon icon="fa-solid fa-arrow-right" />
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
  color: #fff;
  background-color: $app-color;
  display: inline-block;
  vertical-align: baseline;
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

  &__title {
    color: #fff;
    margin-right: 8px;
  }
}
</style>
