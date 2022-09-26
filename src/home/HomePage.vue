<template>
  <div class="home">
    <div class="home__promo">
      <div class="home__wrapper">
        <p class="home__title">Давайте учить польский вместе с нами</p>

        <p class="home__subtitle">
          Все материалы подготовлены <br />
          преподавателем&nbsp;-&nbsp;переводчиком <br />
          Анной Святченковой.
        </p>
        <router-link to="/student/start" class="home__go">Учиться</router-link>
      </div>

      <div class="home__img">
        <img src="./../assets/poland-map.jpg" alt="map" />
      </div>
    </div>

    <div class="home__section-title"><p>Видео уроки</p></div>
    <div class="home__adw">
      <div class="home__img">
        <img src="./../assets/wroclaw.jpg" alt="wroclaw" />
      </div>

      <div class="home__wrapper">
        <p class="home__text">Еще больше видео уроков на Youtube канале Анны</p>
        <a
          class="home__go"
          href="https://www.youtube.com/channel/UCDtQC29FioPUW1L3e1r5OCA"
          >Смотреть</a
        >
      </div>
    </div>

    <div class="home__videos">
      <div class="home__video" v-for="(v, i) in videos" :key="i">
        <YoutubeFrame
          :url="v.url"
          :play="i === currentPlayingVideoId"
          @click="currentPlayingVideoId = i"
        />
      </div>
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
  &__title {
    font-weight: 800;
    font-size: 40px;
    line-height: 50px;
    margin: 40px 0;
  }

  &__section-title {
    display: flex;
    justify-content: center;
    font-weight: 800;
    font-size: 25px;
    line-height: 35px;
    margin: 20px 0;
    color: #1c2323;
  }

  &__promo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .home__img {
    flex-shrink: 0;
    overflow: hidden;
    width: 50%;
    height: 100%;
    border-radius: 20px 20px 20px 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__go {
    text-transform: uppercase;
    padding: 16px;
    color: #fff;
    border-radius: 20px 20px 20px 0px;
    font-weight: 800;
    font-size: 25px;
    line-height: 35px;
    background-color: $app-color;
    margin: 10px 0;
    display: inline-block;
    vertical-align: baseline;

    &:hover {
      color: #fff;
      background-color: $app-color-hover;
    }
  }

  &__subtitle {
    margin: 40px 0;
    font-weight: 400;
    font-size: 25px;
    line-height: 35px;
    color: #404242;
    margin: 20px 0;
  }

  &__videos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 60px;
    // justify-content: center;
  }

  &__video {
    padding: 10px;
  }

  .youtube-iframe {
    width: 268px; //вычтено тестами
    height: auto;
  }

  &__text {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #404242;
  }

  &__wrapper {
    padding: 16px;
  }

  &__adw {
    & .home__img {
      height: 200px;
    }

    display: flex;
    align-items: center;
  }
}
</style>
