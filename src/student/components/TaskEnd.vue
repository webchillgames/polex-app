<template>
  <div class="task-end">
    <div>
      <h2 class="task-end__title">Задание выполнено!</h2>
      <router-link to="/student/start" class="task-end__link"
        >К списку заданий</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.task-end {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(91, 2, 247, 0.7427564775910365) 0%,
    rgba(221, 225, 81, 0.7035407913165266) 35%,
    rgba(81, 212, 225, 0.675529586834734) 100%
  );

  &__title {
    color: #fff;
  }

  &__link {
    display: flex;
    padding: 8px;
    background-color: $app-color;
    color: #fff;
    border-radius: 8px;
    justify-content: center;

    &:hover {
      color: #fff;
      background-color: rgba($app-color, 50%);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
