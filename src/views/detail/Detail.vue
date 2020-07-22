<template>
  <div>
    <detail-nav-bar/>
    <better-scroll class="content">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
    </better-scroll>
  </div>
</template>
   
<script >
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import BetterScroll from 'components/common/betterscroll/BetterScroll'

import {getDetail, Goods, Shop} from 'network/detail'

export default {
  name: "Detail",
  mounted() {
   
  },
  components: {
      DetailNavBar,
      DetailSwiper,
      BetterScroll,
      DetailBaseInfo,
      DetailShopInfo
  },

  data() {
    return {
      iid: '',
      topImages:[],
      goods: {},
      shop:{}
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res=>{
    console.log("-----------");
    console.log(res);
    const data = res.result
    //获取顶部轮播图
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
    }).catch(err=>{
      console.log(err);
    })
  }
};
</script>
   
<style scoped>
  .content {
    position: absolute;
    top: 49px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow: hidden;
  }
</style> 