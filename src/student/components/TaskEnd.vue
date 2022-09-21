<template>
  <div class="task-end">
    <h2 class="task-end__title">Задание выполнено!</h2>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.task-end {
  border: 2px solid orange;
  border-radius: 5px;
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    color: orange;
  }
}
</style>
