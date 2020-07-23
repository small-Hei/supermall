
<template>
   <div class="goods-item">
       <div>
           <img :src="showImage" alt="" @load="imageLoad" @click="itemClick">
           <div class="goods-info">
                <p>{{goodsItem.title}}</p>
                <span class="price">{{goodsItem.price}}</span>
                <span class="collect">{{goodsItem.cfav}}</span>
           </div>
       </div>  
   </div>
</template> 
   
<script >
import {ITEMIMGLOAD} from "common/const";
   export default {
       name:'GoodsListItem',
       props: {
           goodsItem: {
               type: Object,
           }
       },
       computed:{
           showImage() {
               
               return this.goodsItem.image || this.goodsItem.show.img
           }
       },
       methods: {
           imageLoad(){
                // 事件总线
               this.$bus.$emit(ITEMIMGLOAD)
               // 因为详情和首页都使用要区分
               // 方法一 监听不同的方法

                // if(this.$route.path.indexof('/home')){
                //     this.$bus.$emit('homeItemIamgeLoad')
                // }else if(this.$route.path.indexof('/detail')){
                //     this.$bus.$emit('detailItemIamgeLoad')
                // }
           },
           itemClick() {
               console.log(this.goodsItem.iid);
               this.$router.push({
                   path:'/detail',
                   query: {
                       iid: this.goodsItem.iid
                   }
               })
           }
       }
   }
</script>
   
<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }
    .goods-item img{
        width: 100%;
        border-radius: 5px;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }

       
</style> 