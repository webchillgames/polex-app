<template>
  <div class="youtube">
    <iframe
      v-if="play"
      width="268"
      height="150"
      class="youtube-iframe"
      :src="`https://www.youtube.com/embed/${url}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />

    <div v-else class="youtube__preview">
      <img
        width="268"
        height="150"
        :src="`https://i.ytimg.com/vi/${url}/maxresdefault.jpg`"
      />
      <youtube-outlined
        class="youtube__icon"
        :style="{ fontSize: '60px', color: '#ff0000' }"
      />
    </div>
  </div>
</template>

<script>
import { YoutubeOutlined } from "@ant-design/icons-vue";

export default {
  components: { YoutubeOutlined },
  props: {
    play: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      YoutubeOutlined,
    };
  },
};
</script>

<style lang="scss">
.youtube {
  &__preview {
    max-width: 268px;
    position: relative;
    cursor: pointer;
    object-fit: cover;
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
}

.youtube__preview::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.3);
  opacity: 0;
  z-index: 1;
}

.youtube__preview:hover::after {
  opacity: 1;
}
</style>
