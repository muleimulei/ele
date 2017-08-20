<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span>
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
  </div>
</template>

<script>
  const ERR_OK = 0
  export default{
    props: {
      seller: Object
    },
    data () {
      return {
        goods: null,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        // console.log(response)
        response = response.data
        if (response.errno === ERR_OK) {
          console.log(response.data)
          this.goods = response.data
        }
      })
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
      overflow: auto;
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
              line-height: 10px;
            }
            .extra{
              span{
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 10px;
                display: inline-block;
              }
              span:nth-child(1){
                margin-right: 12px;
              }
            }
            .price{
              span{
                display: inline-block;
              }
              span:nth-child(1){
                margin-right: 8px;
                font-size: 10px/14px;
                color: rgb(147, 153, 159);
                font-weight: normal;
                line-height: 24px;
              }
              span:nth-child(2){
                font-size: 10px;
                color: rgb(147, 153, 159);
                font-weight: normal;
                line-height: 24px;
              }
            }
          }
        }
      }
    }
  }
</style>
