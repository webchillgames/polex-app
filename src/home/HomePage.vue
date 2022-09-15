<template>
  <div class="home">
    <h2>Добро пожаловать, студент</h2>

    <h3>Переходи проходить наши упражнения</h3>
    <router-link to="/student/start">Клик сюда</router-link>
    <div class="home__videos">
      <div class="home__video" v-for="(v, i) in videos" :key="i">
        <YoutubeFrame
          :url="v.url"
          :play="i === currentPlayingVideoId"
          @click="currentPlayingVideoId = i"
        />
      </div>

      <p>
        Еще больше видео на YouTube канале Ани -
        <a href="https://www.youtube.com/channel/UCDtQC29FioPUW1L3e1r5OCA"
          >Уроки польского с Аней: учим язык с носителем.</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import { ref, onMounted } from "vue";

import { firebaseService } from "@/services/firebaseService.js";

export default {
  components: { YoutubeFrame },

  setup() {
    const videos = ref([]);
    const currentPlayingVideoId = ref(null);

    onMounted(loadData);
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
    return { videos, YoutubeFrame, currentPlayingVideoId };
  },
};
</script>

<style lang="scss">
.home {
  &__videos {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // justify-content: center;
  }

  &__video {
    padding: 10px;
  }

  .youtube-iframe {
    width: 268px; //вычтено тестами
    height: auto;
  }
}
</style>
