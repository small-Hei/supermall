<template>
<!-- Object.keys(goods).length !== 0 判断是否是空对象 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
        <span v-for="index in goods.services.length-1" :key="index" class="info-service-item">
          <img :src="goods.services[index-1].icon" alt="">
          <span>{{goods.services[index-1].name}}</span>
        </span>
    </div>

  </div>

</template>
   
<script >
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
};
</script>
   
<style scoped>
  .base-info {
    margin-top: 10px;
    padding:0 8px 10px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color:#222;
    font-size: 14px;
  }
  .info-price {
    margin-top: 12px;
  }
  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 13px;
    text-decoration: line-through;
    margin-left: 5px;
  }
  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    border-radius: 8px;
    background-color: var(--color-high-text);
    margin-left: 5px;
    /* 元素上浮 相对定位*/
    position: relative;
    top: -5px;
  }

  .info-other {
    display: flex;
    margin-top: 15px;
    font-size: 12px;
    line-height: 30px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }
  .info-service {
    line-height: 50px;
    display: flex;
    justify-content: space-between;
  }
  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .info-service-item span {
    font-size: 13px;
    color: #333;
    margin-left: 2px;
  }
 


</style> 