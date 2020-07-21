
<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoaded" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script >
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoaded() {
      if (!this.isLoaded) {
          this.$emit('imageLoaded')
          this.isLoaded = true
      }
    }
  }
};
</script>

<style scoped>
</style>