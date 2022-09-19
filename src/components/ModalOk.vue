<template>
  <div id="app-modal" class="app-modal flex-center">
    <p class="app-modal__text"></p>
    <a-button type="primary" @click="close"> Ok </a-button>
  </div>
</template>

<script>
import { ref } from "vue";

import { modalService } from "@/services/modalService.js";

export default {
  setup() {
    const isShow = ref(false);

    function close() {
      modalService.hide();
    }

    return {
      isShow,
      close,
    };
  },
};
</script>

<style lang="scss">
.app-modal {
  top: -100%;
  opacity: 0;
  background-color: #fff;
  z-index: 10;

  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  min-width: 100px;
  min-height: 100px;
  border: 1px solid grey;
  padding: 15px;
}

.app-modal.show {
  top: 5%;
  opacity: 1;
  transition: all 0.5s;
}
</style>
