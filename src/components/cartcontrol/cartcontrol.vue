<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
  import vue from 'vue'
  export default{
    props: {
      food: Object
    },
    created () {
    },
    methods: {
      addCart () {
        if (!this.food.count) {
          vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$root.eventHub.$emit('cart.add', event.target)
      },
      decreaseCart () {
        this.food.count--
      }
    }
  }
</script>

<style lang='less'>
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      transition: all .5s linear;
      &.move-enter{
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
          opacity: 0;
        }
      }
      &.move-enter-to{
        opacity: 1;
        transform: translate3d(0, 0, 0);
        .inner{
          transform: rotate(0);
          opacity: 1;
        }
      }
      &.move-leave{
        transform: translate3d(0, 0, 0);
        .inner{
          transform: rotate(0);
          opacity: 1;
        }
      }
      &.move-leave-to{
        transform: translate3d(24px, 0, 0);
        .inner{
          opacity: 0;
          transform: rotate(180deg);
        }
      }
      .inner{
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all .4s linear;
        transform: rotate(0);
      }
    }
    .cart-count{
      display: inline-block;
      width: 12px;
      vertical-align: top;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      color: rgb(147, 153, 153);
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }

  

</style>
