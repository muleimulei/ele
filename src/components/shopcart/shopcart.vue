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
        <div class="desc">
          另需配送费{{deliveryPrice}}￥
        </div>
      </div>
      <div class="content-right">
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
  </div>
</template>

<script>
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
      dropBalls: []
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
    }
  }
}
</script>

<style lang='less' scoped>
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
  }
</style>
