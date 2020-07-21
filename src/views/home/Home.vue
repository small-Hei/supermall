<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <better-scroll 
        class="content" 
        ref="betterscroll" 
        :probeType="3" 
        @scroll="contentScroll"
        :pullUpLoad = 'true'
        @pullingUp="pullingUp"
        >
            <home-swiper :banners='banners'/>
            <home-recommend-view :recommends='recommends'/>
            <home-feature-view/>
            <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" class="tab-control"/>
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
    data() {
        return {
            banners:[],
            recommends: [],
            goods: {
                'pop':{page: 0, list:[]},
                'new':{page: 0, list:[]},
                'sell':{page: 0, list:[]},
            },
            currentType: 'pop',
            isShowBackTop: false
        }
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata()
        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
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
                this.$refs.betterscroll.finishPullUp()
            })
        },

        /**
         * 事件监听相关
         */
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2: 
                    this.currentType = 'sell'
                    break
            }
        },
        /**
         * 回到顶部
         */
        backTop() {
            this.$refs.betterscroll.scrollTo(0,0)
        },
        /**
         * 滚动监听
         */
        contentScroll(position) {
           this.isShowBackTop = (-position.y > 1000)
        },
        /**
         * 上拉加载更多
         */
        pullingUp() {
            this.getHomeGoods(this.currentType)
        }
    },
    computed : {
        showList () {
            return this.goods[this.currentType].list
        }
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
    .tab-control {
        /* 使用 betterScroll 这个sticky不起作用*/
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