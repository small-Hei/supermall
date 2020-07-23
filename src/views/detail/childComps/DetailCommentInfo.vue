<template>
    <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
        <div class="comment-header">
            <div class="header-title">用户评论</div>
            <div class="header-more">更多</div>
        </div>
        <div class="comment-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="comment-detail">
            <p>{{commentInfo.content}}</p>
            <div class="comment-other">
                <span>{{commentInfo.created|showDate}}</span>
                <span class="other-style">{{commentInfo.style}}</span>
            </div>
            <div class="comment-imgs">
                <img v-for="(item, index) in commentInfo.images" :src="item" alt="" :key="index">
            </div>
        </div>

    </div>
</template>
   
<script >
import {formatDate} from "common/utils";
export default {
  name: "",
  props: {
      commentInfo: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  filters: {
      showDate: function (value){
          // 1.将时间戳转化成Date
          let date = new Date(value*1000);
          // 2.将date进行格式化
          return formatDate(date,'yyyy-MM-dd')
      }
  }
};
</script>
   
<style scoped>
    .comment-info {
        padding: 0px 10px;
        color: #333;
    }
    .comment-header{
        line-height: 50px;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
    }
    .comment-user {
        padding-top: 10px;
        align-items: center;
    }
    .comment-user img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }
    .comment-user span {
        font-size: 15px;
        position: relative;
        top: -15px;
        margin-left: 10px;
    }
    .comment-detail {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
    }

    .comment-detail .comment-other{
        margin-top: 10px;
    }
    .comment-detail .other-style {
        margin-left: 10px;
    }
    .comment-imgs {
        margin-top: 10px;
    }
    .comment-imgs img {
        width: 70px;
        height: 70px;
        margin-left: 5px;
    }

</style> 