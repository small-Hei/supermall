
<template>
   <div class="goods">
       <goods-list-item v-for="(item, index) in goodsList" :key="index" :goodsItem = item>
       </goods-list-item>
   </div>
</template>
   
<script >
    import GoodsListItem from './GoodsListItem'
    export default {
       name:'GoodsList',
       props: {
           goodsList: {
                type: Array,
                default() {
                    return []
                }
               
           }
       },
       components: {
           GoodsListItem
       }
    }
</script>
   
<style scoped>
       
   .goods {
       display: flex;
       flex-wrap: wrap;
       justify-content: space-around;
       padding: 2px;
   }

</style> 