<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control  class="tab-control" ref="topTab" v-show="showTabControl" @tabClick='tabClick' :titles="['流行','新款','精选']"/>
        <better-scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad = 'true' @pullingUp="loadMore">
            <home-swiper :banners='banners' @imageLoaded="swiperImageLoad"/>
            <home-recommend-view :recommends='recommends'/>
            <home-feature-view/>
            <!-- <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" class="tab-control"/> -->
            <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" class="tab-control" ref="tabControl"/>
            <goods-list :goodsList="showList"></goods-list> 
        </better-scroll>
        <!-- 直接监听组件点击 click.native -->
        <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
    
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BetterScroll from 'components/common/betterscroll/BetterScroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {TOP_DISTANCE, POP, NEW, SELL,ITEMIMGLOAD} from "common/const";
// import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
    name:'Home',
    components: {
        HomeSwiper,
        HomeRecommendView,
        HomeFeatureView,

        NavBar,
        TabControl,
        GoodsList,
        BetterScroll,
        BackTop
    },
    //混入
    mixins:[itemListenerMixin],
    data() {
        return {
            banners:[],
            recommends: [],
            goods: {
                'pop':{page: 0, list:[]},
                'new':{page: 0, list:[]},
                'sell':{page: 0, list:[]},
            },
            currentType: POP,
            isShowBackTop: false,
            taboffsetTop: 0,
            showTabControl: false,
            saveY: 0,
            // itemImgListener: null

        }
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata()
        // 2.请求商品数据
        this.getHomeGoods(POP)
        this.getHomeGoods(NEW)
        this.getHomeGoods(SELL)

    },
    mounted() {
        // //图片加载完成的事件监听
        // const refresh = debounce(this.$refs.scroll.refresh,2000)
        // // // 3.监听item中图片加载完成 重新设置滚动的范围
        // // this.itemImgListener = ()=>{
        // //     refresh() 
        // // }
        // // this.$bus.$on(ITEMIMGLOAD,this.itemImgListener)
        // this.$bus.$on(ITEMIMGLOAD,()=>{
        //     // 防抖函数（防止频繁调用） 对于refresh非常频繁的问题 进行防抖函数
        //     // this.$refs.betterscroll.refresh()

        //     // 防抖debounce/节流throttle
        //     refresh()   
        // })


        //2.获取tabControl的offsetTop 实现吸顶效果
        //所有的组件都有一个属性 $el: 用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
    },

    methods: {
        /**
         * 网络请求相关
         * 
         */
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },

        getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1
                // 完成上拉加载更多
                this.$refs.scroll.finishPullUp()
            })
        },

        /**
         * 事件监听相关
         */

        //防抖函数 防止频繁的调用
       
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2: 
                    this.currentType = SELL
                    break
            }
            this.$refs.tabControl.currentIndex = index
            this.$refs.topTab.currentIndex = index
        },
        /**
         * 回到顶部
         */
        backTop() {
            this.$refs.scroll.scrollTo(0,0)
        },
        /**
         * 滚动监听 是否展示滑到顶部的按钮
         */
        contentScroll(position) {
           this.isShowBackTop = (-position.y > 1000)
           this.showTabControl = position.y <= -this.taboffsetTop
        },
        /**
         * 上拉加载更多
         */
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        /**
         * 轮播图加载完成
         */
        swiperImageLoad() {
            // console.log(this.$refs.tabControl.$el.offsetTop);
            this.taboffsetTop = this.$refs.tabControl.$el.offsetTop
        }
    },
    computed : {
        showList () {
            return this.goods[this.currentType].list
        }
    },
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        // 1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY()
        //2. 取消全局事件的监听 如果不传递 this.itemImgListener 所有的监听 ITEMIMGLOAD 都会被取消
        this.$bus.$off(ITEMIMGLOAD, this.itemImgListener)

    },
    destroyed() {
        console.log('home destroyed')
    }
}
</script>

<style scoped>
    #home {
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;

    }
    /* 使用 betterScroll 这个sticky不起作用*/
    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }
    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /* .content {
        margin-top: 44px;
        height: calc(100% - 93px);
        background-color: red;
        overflow: hidden;
    } */
</style>