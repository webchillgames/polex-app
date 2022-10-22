<template>
  <div class="home">
    <div class="home__promo">
      <div class="wrapper">
        <div>
          <p class="home__title">
            PolEx - сайт с упражнениями на польском языке
          </p>

          <div class="home__subtitle">
            Мы активно развиваем наше комьюнити и стремимся вырасти в школу.
            Сейчас, в тестовом режиме, для вас доступен наш сайт с упражнениями.
            <br />
            Приятный бонус - регистрироваться не нужно.
          </div>

          <CGoButton title="Упражнения" rLink="/student/start" />
        </div>

        <div class="home__games">
          <CGamePreview link="/ex1-min.jpeg" class="home__game" />
          <CGamePreview link="/ex2-min.jpeg" class="home__game" />
        </div>
      </div>
    </div>
    <div class="wrapper">
      <h2 class="home__section-title">Не только упражнения...</h2>
      <div class="home__subtitle">
        Будем рады видеть вас на нашем ютуб канале и в телеграм чате. Там вы
        сможете подтянуть теорию, а так же задать вопросы. <br />
        А те, кто хочет уровень занятий выше, приглашаем вас на индивидуальные
        онлайн-занятия.
      </div>
    </div>

    <div class="home__benefits wrapper">
      <CBenefitPreview v-for="v in BENEFITS" :key="v.id" :item="v" />
    </div>
    <!-- 
    <h2 class="home__section-title">Видео уроки</h2>

    <div class="home__adw">
      <div class="home__img">
        <img src="./../assets/wroclaw.jpg" alt="wroclaw" />
      </div> -->

    <!-- <div class="home__wrapper">
        <p class="home__text">Еще больше видео уроков на Youtube канале Анны</p>

        <CGoButton
          title="Смотреть"
          aHref="https://www.youtube.com/channel/UCDtQC29FioPUW1L3e1r5OCA"
        />
      </div>
    </div> -->

    <!-- <div class="home__videos">
      <div class="home__video" v-for="(v, i) in videos" :key="i">
        <YoutubeFrame
          :url="v.url"
          :play="i === currentPlayingVideoId"
          @click="currentPlayingVideoId = i"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
import YoutubeFrame from "@/components/YoutubeFrame.vue";

import { ref, onMounted } from "vue";

import { firebaseService } from "@/services/firebaseService.js";
import CGoButton from "./components/CGoButton.vue";
import CGamePreview from "./components/CGamePreview.vue";
import CBenefitPreview from "./components/CBenefitPreview.vue";

const BENEFITS = [
  {
    id: 1,
    title: "YouTube канал",
    icon: "fa-brands fa-youtube",
    text: "С уроками от преподавателя",
    background: "#eaf8f6",
    color: "#dd2a25",
    link: "https://www.youtube.com/channel/UCDtQC29FioPUW1L3e1r5OCA",
  },
  {
    id: 2,
    title: "Telegram чат",
    icon: "fa-brands fa-telegram",
    text: "Новости, общение, поддержка",
    background: "#fff2ee",
    color: "#33a6d9",
    link: "https://t.me/polishlesons",
  },
  {
    id: 3,
    title: "Ваш репетитор",
    icon: "fa-solid fa-solid fa-person-chalkboard",
    text: "Для максимального результата",
    background: "#faeefa",
    color: "515fe1",
    link: "http://profi.ru/profile/SvyatchenkovaAP/?mobileApp=1",
  },
];

export default {
  components: { YoutubeFrame, CGoButton, CGamePreview, CBenefitPreview },

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
    return {
      videos,
      YoutubeFrame,
      currentPlayingVideoId,
      CGoButton,
      CGamePreview,
      BENEFITS,
      CBenefitPreview,
    };
  },
};
</script>

<style lang="scss">
.home {
  &__benefits {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__game {
    animation: upDown 3s infinite;
  }

  &__game:nth-child(2) {
    animation-delay: 1s;
  }

  &__title {
    font-weight: 800;
    font-size: 40px;
    line-height: 50px;
    margin: 40px 0;
  }

  &__subtitle {
    font-weight: 400;
    font-size: 25px;
    line-height: 35px;
    color: $font-light;
    margin: 20px 0;
    padding-left: 16px;
    text-align: left;

    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background-color: $app-color;
    }
  }

  &__promo {
    background-color: $bg-light;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    .wrapper {
      padding: 16px;
      padding-bottom: 60px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      grid-gap: 20px;
    }
  }

  &__adw {
    flex-direction: column;
  }

  &__section-title {
    font-size: 18px;
    line-height: 25px;
    margin-top: 60px;
    text-align: center;
  }

  &__title {
    font-size: 26px;
    line-height: 35px;
    margin: 0;
  }

  &__subtitle {
    font-size: 18px;
    line-height: 24px;
  }

  &__videos {
    margin-top: 40px;
    width: 100%;
  }

  &__games {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1023px) {
  .home {
    &__benefits {
      padding-bottom: 60px;
    }

    &__section-title {
      text-align: center;
      font-weight: 800;
      font-size: 40px;
      line-height: 55px;
      margin: 50px 0;
      color: #1c2323;

      p {
        margin: 0;
      }
    }

    &__promo {
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }

    &__go {
      font-weight: 800;
      font-size: 25px;
      line-height: 35px;

      text-transform: uppercase;
      padding: 16px;
      color: #fff;
      border-radius: 20px;
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
      padding: 8px;
    }

    &__adw {
      & .home__img {
        height: 200px;
      }

      display: flex;
      align-items: center;
    }
  }
}
@keyframes upDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(-1px);
  }
}
</style>
