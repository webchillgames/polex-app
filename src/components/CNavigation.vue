<template>
  <nav class="c-navigation">
    <RouterLink to="/" class="c-navigation__logo">PolEx</RouterLink>

    <button type="button" @click="isOpen = true" class="c-navigation__open">
      <font-awesome-icon icon="fa-solid fa-bars" />
    </button>

    <div class="c-navigation__list">
      <router-link
        v-for="(v, i) in navLinks"
        :key="i"
        :to="v.link"
        class="c-navigation__link"
        :class="{ active: activeTab === v.title }"
        >{{ v.title }}</router-link
      >
    </div>

    <div class="c-navigation__menu" v-if="isOpen">
      <button type="button" class="c-navigation__close" @click="isOpen = false">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
      <RouterLink
        @click="isOpen = false"
        to="/"
        class="c-navigation__link c-navigation__link--logo"
        >PolEx</RouterLink
      >

      <router-link
        v-for="(v, i) in navLinks"
        :key="i"
        :to="v.link"
        class="c-navigation__link"
        :class="{ active: activeTab === v.title }"
        @click="isOpen = false"
        >{{ v.title }}</router-link
      >
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const navLinks = [
  { link: "/teacher/start/creating", title: "Teacher" },
  { link: "/student/start", title: "Student" },
];

export default {
  setup() {
    const isOpen = ref(false);
    return {
      isOpen,
      navLinks,
      RouterLink,
    };
  },
};
</script>

<style lang="scss">
.c-navigation {
  justify-content: space-between;
  background-color: $bg-light;
  display: flex;
  align-items: center;

  &__list {
    display: none;
  }

  &__menu {
    animation: opening 1s linear forwards;
    position: fixed;
    top: 0;
    left: -100%;
    width: 95%;
    height: 100%;
    box-shadow: 0 0 100px 0 #000;
    z-index: 1000;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }

  &__link {
    font-size: 16px;
    font-weight: 500;
    padding: 8px 16px;
    color: rgba(#000, 0.6);
    border-bottom: 1px solid rgba(#000, 10%);
  }

  &__open,
  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 40px;
    height: 40px;
  }

  &__open {
    background-color: #fff;
    border-radius: 8px;
    margin: 16px;
  }

  &__close {
    z-index: 1;
    background-color: transparent;

    position: absolute;
    right: 8px;
    top: 16px;
    border-radius: 50%;
    box-shadow: 0 10px 20px rgb(0 0 0 / 10%);
  }
}

.c-navigation__link.c-navigation__link--logo,
.c-navigation__logo {
  font-family: "Rubik Dirt", cursive;
  color: $app-color;
  font-size: 30px;
  line-height: 40px;
  padding: 16px;
}

@media (min-width: 1023px) {
  .c-navigation {
    padding: 16px;

    &__list {
      display: flex;
    }

    &__close,
    &__open {
      display: none;
    }

    &__link {
      font-weight: 700;
      font-size: 25px;
      line-height: 38px;
      color: $app-color;
      position: relative;
      border-radius: 8px;
      background-color: #fff;

      &:hover {
        color: rgba($app-color, 0.7);
        box-shadow: 0 10px 20px rgb(0 0 0 / 10%);
      }

      & + .c-navigation__link {
        margin-left: 20px;
      }
    }
  }
}

@keyframes opening {
  0% {
    left: -100%;
  }

  100% {
    left: 0;
  }
}
</style>
