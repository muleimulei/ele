<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'head',
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang='less'>
  @import '../../common/less/mixin';

  .header{
    color: white;
    background: #000;
    .content-wrapper{
      padding: 24px 12px 18px 24px;
      display: flex;
      .avatar > img{
        border-radius: 2px;
      }
      .content{
        flex: 1;
        margin-left: 16px;
        .title{
          margin: 2px 0 8px 0;
          .brand{
            display: inline-block;
            width: 30px;
            height: 18px;
            background-image: url('brand');
            background-size: cover;
          }
          .name{
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            vertical-align: top;
          }
        }
        .description{
          font-size: 12px;
          line-height: 12px;
          margin-bottom: 10px;
        }
        .support{
          .icon{
            display: inline-block;;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: cover;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image('decrease_1');
            }
            &.discount{
              .bg-image('discount_1');
            }
            &.guarantee{
              .bg-image('guarantee_1');
            }
            &.invoice{
              .bg-image('invoice_1');
            }
            &.special{
              .bg-image('special_1');
            }
          }
        }
      }
    }
  }
</style>
