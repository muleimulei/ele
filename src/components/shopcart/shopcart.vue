<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'highlight': totalCount > 0}">
            <span class="icon-shopping_cart" :class="{ 'highlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc" @click="togglelist">
          另需配送费{{deliveryPrice}}￥
        </div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="totalPrice < minPrice ? 'not-enough' : 'enough'">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" name='drop' tag='div'>
        <div v-for='(ball, index) in balls' :key='index' v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold-transition">
      <div class="shopcart-list" v-show="listshow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food = 'food'></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listshow" @click="togglelist"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default{
  props: {
    minPrice: Number,
    deliveryPrice: Number,
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      listshow: false
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      if (count === 0) {
        this.listshow = false
      }
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}起送`
      } else {
        return '去结算'
      }
    }
  },
  created () {
    this.$root.eventHub.$on('cart.add', (target) => {
      this._drop(target)
    })
  },
  methods: {
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 22
          let y = -(window.innerHeight - rect.top - 22 - 20)
          console.log('y:---', y)
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el) {
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0, 0, 0)`
        el.style.transform = `translate3d(0, 0, 0)`
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = `translate3d(0, 0, 0)`
        inner.style.transform = `translate3d(0, 0, 0)`
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    _drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          console.log(el)
          this.dropBalls.push(ball)
          return
        }
      }
    },
    togglelist () {
      if (!this.totalCount) {
        return
      }
      this.listshow = !this.listshow
      if (this.listshow) {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          })
        }
      }
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay () {
      if (this.totalPrice > this.minPrice) {
        alert(this.totalPrice)
      }
    }
  }
}
</script>

<style lang='less' scoped>
  @import '../../common/less/mixin';
  .shopcart{
    position: fixed;
    bottom: 0;
    height: 48px;
    width: 100%;
    background: #000;
    .content{
      display: flex;
      height: inherit;
      background: #141d27;
      .content-left{
        flex: 1;
        display: flex;
        .logo-wrapper{
          margin-left: 12px;
          height: 56px;
          width: 56px;
          padding: 6px;
          border-radius: 100%;
          position: relative;
          bottom: 10px;
          box-sizing: border-box;
          background: #141d27;
          .logo{
            height: 100%;
            background: #2b343c;
            border-radius: 50%;
            text-align: center;
            &.highlight{
              background: rgb(0, 150, 220);
            }
            .icon-shopping_cart{
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight{
                color: #fff;
              }
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: white;
            background: rgb(240, 20, 20); 
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price{
          margin: 12px 0;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
        }
        .desc{
          margin: 12px 0 12px 12px;
          line-height: 24px;
          font-size: 16px;
          flex: 1;
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        .pay{
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          background: #2b333b;
          &.not-enough{
            background: #2b333b;
          }
          &.enough{
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 100;
        &.drop-enter-active{
          transition: all .5s cubic-bezier(.39,-0.47,.71,.21);
          .inner{
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all .5s linear;
          }
        }
      }
    }
    .shopcart-list{
      position: absolute;
      transition: all .5s;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
      transform: translate3d(0, -100%, 0);
      &.fold-transition-enter, &.fold-transition-leave-to{
        transform: translate3d(0, 0, 0);
      }
      &.fold-transition-leave{
        transform: translate3d(0, -100%, 0);
      }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .title{
          float: left;
          font-size: 14px;
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        padding: 0 18px;
        max-height: 217px;
        background: #fff;
        overflow: hidden;
      }
      .food{
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .border-1px(rgba(7, 17, 27, .1));
        .name{
          margin-right: auto;
          font-size: 14px;
          line-height: 24px;
          color: rgb(7, 17, 27);
        }
        .price{
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
      }
    }
    .list-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      backdrop-filter: blur(10px);
      filter: blur(10px);
      background-color: rgba(7, 17, 27, .6);
      transition: all .5s;
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
      }
      &.fade-enter-to, &.fade-leave{
        opacity: 1;
      }
    }
  }
</style>
