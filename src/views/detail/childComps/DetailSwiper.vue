

<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <a href>
        <img :src="item" alt />
      </a>
    </swiper-item>
  </swiper>
</template>
   
<script >
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>
   
<style scoped>
.detail-swiper {
  height: 300px;
}
</style> 