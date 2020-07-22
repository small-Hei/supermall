<template>
  <div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src= "~assets/img/common/back.svg" alt="">
        </div>
      <div slot="center" class="title">
          <div v-for="(title, index) in titles" 
          class="title-item" 
          @click="titleClick(index)" 
          :class="{active: currentIndex==index}" :key="index">{{title}}</div>
      </div>
    </nav-bar>
  </div>
</template>
   

<script >
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data(){
      return {
          titles: ['商品','参数','评论','推荐'],
          currentIndex: 0
      }
  },
  methods: {
      titleClick(index) {
          console.log('22222');
          this.currentIndex = index
      },
      backClick() {
          this.$router.back()
      }
  },
  components: {
    NavBar
  }
};
</script>
   
<style scoped>
    .title{
        display: flex;
        font-size: 14px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: red;
    }
    .back {
        margin-top: 8px;
    }
</style> 