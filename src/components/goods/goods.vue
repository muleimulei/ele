<template>
  <div class="goods">
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{current: currentIndex === index}" @click="selectMenu(index)">
          <span class="text">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart></shopCart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopCart from '../shopcart/shopcart'
  const ERR_OK = 0
  export default{
    props: {
      seller: Object
    },
    components: {
      shopCart
    },
    data () {
      return {
        goods: null,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        listHeight: [0],
        scrollY: 0
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        // console.log(response)
        response = response.data
        if (response.errno === ERR_OK) {
          // console.log(response.data)
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i]
          let h2 = this.listHeight[i + 1]
          if (!h2 || this.scrollY >= h1 && this.scrollY < h2) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index) {
        // console.log(index)
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let ele = foodList[index]
        this.foodsScroll.scrollToElement(ele, 300)
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '../../common/less/mixin';
  .goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current{
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background-color: #fff;
          font-weight: 700;
          .text{
            .border-0px(rgb(0, 0, 0));
          }
        }
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: cover;
          background-repeat: no-repeat;
          &.decrease{
            .bg-image('decrease_3');
          }
          &.discount{
            .bg-image('discount_3');
          }
          &.guarantee{
            .bg-image('guarantee_3');
          }
          &.invoice{
            .bg-image('invoice_3');
          }
          &.special{
            .bg-image('special_3');
          }
        }
        .text{
          font-size: 12px;
          display: table-cell;
          vertical-align: middle;
          .border-1px(rgba(7, 17, 27, .1));
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .food-list{
        .title{
          margin: 0;
          height: 26px;
          padding-left: 14px;
          border-left: 2px solid #d9dde1;
          background: #f3f5f7;
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 26px;
        }
        .food-item{
          display: flex;
          padding: 18px;
          &:not(:last-child){
            .border-1px(rgba(7, 17, 17, .1));
          }
          .icon{
            flex: 0 0 57px;
          }
          .content{
            margin-left: 10px;
            flex:1;
            .name{
              margin-top: 2px;
              font-size: 14px;
              color: rgb(7, 17, 27);
              line-height: 14px;
            }
            .desc{
              margin: 8px 0;
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 12px;
            }
            .extra{
              span{
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 10px;
              }
              span:nth-child(1){
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
          }
        }
      }
    }
  }
</style>
