<template>
  <transition name="move">
    <div class="food" ref="food" v-show="showFlag">
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
          <div v-if="!food.count || food.count===0" class="buy" @click="addFirst">加入购物车
          </div>
          <div v-else class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :only-content="onlyContent" :ratings="food.ratings" :desc="desc" :select-type="selectType"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length > 0">
              <li class="rating-item" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12" alt="">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.length">
              
            </div>
          </div>
        </div>
        </div>
    </div>
  </transition>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import Vue from 'vue'
  import ratingselect from '../ratingselect/ratingselect'
  export default{
    props: {
      food: Object
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        Vue.set(this.food, 'count', 1)
        this.$root.eventHub.$emit('cart.add', event.target)
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
    transition: all .5s cubic-bezier(0.26, 0.24, 1, 1);
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
    .content{
      padding: 18px;
      position: relative;
      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail{
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        .sell-count, .rating{
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count{
          margin-right: 12px;
        }
      }
      .price{
        span{
          display: inline-block;
          font-weight: normal;
          line-height: 24px;
        }
        span:nth-child(1){
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240 , 20, 20);
        }
        span:nth-child(2){
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .buy{
        position: absolute;
        width: 74px;
        height: 24px;
        border-radius: 12px;
        background: rgb(0, 160, 220);
        right: 18px;
        bottom: 18px;
        color: white;
        line-height: 24px;
        font-size: 10px;
        text-align: center;
      }
      .cartcontrol-wrapper{
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
    }
    .info{
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(77, 17, 27);
      }
      .text{
        line-height: 24px;
        padding-left: 8px;
        font-size: 12px;
      }
    }
    .rating{
      padding-top: 18px;
      .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
    }
  }
</style>
