<template>
  <div class="videos-editor">
    <h3>Управление сеткой видео на Главной странице</h3>

    <a-input v-model:value="input" placeholder="Вставь сюда сылку на ролик" />
    <InfoCollapse
      :data="YOTUBE_LINK_INFO"
      title="Где взять ссылку"
      id="howGetLink"
      :style="{ margin: '10px 0 20px 0' }"
    />

    <a-button
      :disabled="input === ''"
      type="primary"
      @click="add"
      :style="{ margin: '10px 0' }"
      >Добавить в список</a-button
    >
    <p>Список добавленных роликов:</p>

    <div v-if="videos.length > 0">
      <div v-for="(v, i) in videos" :key="i" class="videos-editor__wrapper">
        <YoutubeFrame
          :url="v.url"
          :play="i === currentPlayingVideoId"
          @click="currentPlayingVideoId = i"
        />

        <a-button
          type="primary"
          @click="() => remove(i)"
          :style="{ margin: '10px' }"
          >Удалить</a-button
        >
      </div>

      <a-button type="primary" @click="save" :style="{ margin: '10px 0' }"
        >Сохранить</a-button
      >
    </div>
    <div v-else>Нет видео...</div>

    <ModalOk v-model="modalIsShowing" :text="modalText" />
  </div>
</template>

<script>
import InfoCollapse from "@/components/InfoCollapse.vue";
import ModalOk from "@/components/ModalOk.vue";
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import { YOTUBE_LINK_INFO } from "@/assets/tips.js";

import { onMounted, ref, watch } from "vue";

import { firebaseService } from "@/services/firebaseService.js";

export default {
  components: { InfoCollapse, ModalOk, YoutubeFrame },
  setup() {
    const input = ref("");
    const videos = ref([]);
    const modalIsShowing = ref(false);
    const modalText = ref("");
    const currentPlayingVideoId = ref(null);

    watch(modalIsShowing, (newV, prevV) => {
      if (prevV && !newV) {
        modalText.value = "";
      }
    });

    function add() {
      videos.value.push({ url: input.value });
      input.value = "";
    }

    function remove(idx) {
      const filtered = videos.value.filter((_, i) => i !== idx);
      videos.value = filtered;
    }

    async function loadData() {
      try {
        const res = await firebaseService.fetchByPath("/videos/list");

        if (res === "") {
          return;
        }

        videos.value = res;
      } catch (e) {
        console.log(e);
      }
    }

    async function save() {
      try {
        firebaseService.writeToList("/videos", "/list", videos.value);
        modalIsShowing.value = true;
        modalText.value = "Успешно сохранено";
      } catch (e) {
        console.log(e);
        modalIsShowing.value = true;
        modalText.value = "Какие то проблемки. Попробуй еще раз";
      }
    }

    onMounted(loadData);

    return {
      modalIsShowing,
      modalText,
      save,
      remove,
      videos,
      add,
      input,
      InfoCollapse,
      YOTUBE_LINK_INFO,
      ModalOk,
      YoutubeFrame,
      currentPlayingVideoId,
    };
  },
};
</script>

<style lang="scss">
.videos-editor {
  &__wrapper {
    margin: 10px 0;
    display: flex;
    align-items: flex-start;
  }
}
</style>
