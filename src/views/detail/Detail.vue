<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <better-scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :paramInfo="paramInfo" @imageLoad="imageLoad"/>
        <detail-comment-info :commentInfo="commentInfo"/>
        <goods-list :goodsList="recommendList"></goods-list>

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
import DetailCommentInfo from './childComps/DetailCommentInfo'

import BetterScroll from 'components/common/betterscroll/BetterScroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
// import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
import {ITEMIMGLOAD} from "common/const"

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
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
  },
  //混入
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: '',
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList:[],
      // itemImgListener: null
    }
  },
  created() {
    this.iid = this.$route.query.iid
    getDetail(this.iid).then(res=>{
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
      // 6.取出参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 7.取出评论的信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
      }
    }).catch(err=>{
      console.log(err);
    })

    getRecommend().then(res=> {
      console.log("---------");
      console.log(res);
      this.recommendList = res.data.list
    }).catch(err=>{

    })
  },
  mounted() {
    //图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,200)
    // // 3.监听item中图片加载完成 重新设置滚动的范围
    // this.itemImgListener = ()=>{
    //   refresh() 
    // }
    // this.$bus.$on(ITEMIMGLOAD,this.itemImgListener)
  },
  //组件没有 keep-alive 此两个方法不会执行
  // activated() {
 
  // },
  // deactivated() {
      
  // },

  //销毁调用
  destroyed(){
    this.$bus.$off(ITEMIMGLOAD,this.itemImgListener)
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