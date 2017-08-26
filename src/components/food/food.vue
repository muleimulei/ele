<template>
  <transition name="move">
    <div class="food" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img width="100%" height="100%" :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span>￥{{food.price}}</span>
            <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{
    props: {
      food: Object
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>


<style lang="less">
  .food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 50;
    width: 100%;
    background: #fff;
    transition: all .5s linear;
    &.move-enter, &.move-leave-to{
      transform: translate3d(100%, 0, 0);
    }
    &.move-enter-to, &.move-leave{
      transform: translate3d(0, 0, 0);
    }
    .image-header{
      width: 100vw;
      height: 100vw;
      position: relative;
      .back{
        position: absolute;
        left: 0;
        top: 10px;
        .icon-arrow_lift{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: white;
        }
      }
    }
  }
</style>
