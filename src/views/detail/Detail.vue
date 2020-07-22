<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <better-scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :paramInfo="paramInfo" @imageLoad="imageLoad"/>

    </better-scroll>
  </div>
</template>
   
<script >
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import BetterScroll from 'components/common/betterscroll/BetterScroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

export default {
  name: "Detail",
  mounted() {
   
  },
  components: {
      DetailNavBar,
      DetailSwiper,
      BetterScroll,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo
  },

  data() {
    return {
      iid: '',
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{}
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res=>{
      console.log(res);
      // 1.获取数据
      const data = res.result
      // 2.获取顶部轮播图
      this.topImages = data.itemInfo.topImages
      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo
      // 6.
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

    }).catch(err=>{
      console.log(err);
    })
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
};
</script>
   
<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style> 