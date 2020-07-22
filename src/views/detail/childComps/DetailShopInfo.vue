<template>
  <div v-if="Object.keys(shop).length !== 0" class="base-shop">
    <div class="info-shop">
      <div class="shop-top">
        <img :src="shop.logo" alt />
        <span class="shop-title">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
          <div class="info-sell">
            <div class="sell-count">{{shop.sells|sellCountFilter}}</div>
            <div>总销量</div>
          </div>
          <div class="info-goods">
            <div class="goods-count">{{shop.goodsCount}}</div>
            <div>全部宝贝</div>
          </div>
        </div>
        <div class="shop-middle-item shop-middle-right">
          <table>
            <tr v-for="(item,index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
   
<script >
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter: function(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>
   
<style scoped>
.base-shop {
  padding: 20px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  line-height: 45px;
  /* 让元素垂直居中 */
  display: flex;
}
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.shop-top .shop-title {
  margin-left: 8px;
  font-size: 14px;
}

.shop-middle {
  padding: 20px 0;
  display: flex;
  align-items: center;
}

.shop-middle .shop-middle-item {
  flex: 1;
}

.shop-middle-left {
  display: flex;
  color: #333;
  font-size: 12px;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-evenly;
}
.sell-count,
.goods-count {
  font-size: 18px;
  margin-bottom: 5px;
}
.shop-middle-right {
  text-align: center;
  font-size: 13px;
}

.shop-middle-right table {
  width: 120px;
  margin-left: 28px;
}
.shop-middle-right table td {
  padding: 5px 0;
}
.shop-middle-right .score {
  color: #5ea732;
}
.shop-middle-right .score-better {
  color: #f13e3a;
}
.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.shop-middle-right .better-more span {
  background-color: #f13e3a;
}
</style> 