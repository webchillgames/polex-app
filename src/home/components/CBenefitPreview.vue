<template>
  <a
    :href="item.link"
    class="c-benefit-preview flex-center"
    :style="{ 'background-color': item.background }"
  >
    <div class="c-benefit-preview__icon">
      <font-awesome-icon :icon="item.icon" :style="{ color: item.color }" />
    </div>

    <h3 class="c-benefit-preview__title">{{ item.title }}</h3>
    <p class="c-benefit-preview__text">{{ item.text }}</p>

    <div class="c-benefit-preview__arrow flex-center">
      <font-awesome-icon icon="fa-solid fa-arrow-right" />
    </div>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.c-benefit-preview {
  width: 290px;
  border-radius: 8px;
  flex-direction: column;
  padding: 36px 16px;
  margin: 16px;
  transition: all 1s;
  cursor: pointer;
  position: relative;
  color: #000;
  margin-bottom: 40px;

  &__arrow {
    position: absolute;
    bottom: 0;
    width: 40px;
    height: 40px;
    background-color: $app-color;
    border-radius: 50%;
    color: #fff;
    transform: translateY(50%);
    opacity: 0;
    transition: all 1s;
  }

  &__icon {
    font-size: 30px;
    line-height: 30px;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 26px;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    text-align: center;
  }

  &__text {
    margin: 0;
    text-align: center;
  }
}

.c-benefit-preview:hover {
  color: #000;

  .c-benefit-preview {
    &__icon {
      animation: rotating 2s infinite;
    }

    &__arrow {
      opacity: 1;
    }
  }
}

@media (min-width: 1023px) {
}

@keyframes rotating {
  0% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1.3) rotate(360deg);
  }
}
</style>
