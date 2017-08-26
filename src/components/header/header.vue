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
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailshow" class="detail">
        <div class="detail-wrapper">
          <div class="detail-main">
            <p class="name">{{seller.name}}</p>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>  
            </div>
            <separate message="优惠信息"></separate>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                 <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                 <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <separate message="商家公告"></separate>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import separate from '../separate/separate.vue'
  export default{
    name: 'head',
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      showDetail () {
        this.detailshow = true
      },
      hideDetail () {
        this.detailshow = false
      }
    },
    components: {
      star,
      separate
    },
    data () {
      return {
        detailshow: false,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    }
  }
</script>

<style lang='less'>
  @import '../../common/less/mixin';

  .header{
    color: white;
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper{
      padding: 24px 12px 18px 24px;
      display: flex;
      position: relative;
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
            .bg-image('brand');
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
          display: flex;
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
          .text{
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom: 18px;
        line-height: 24px;
        padding: 0 8px;
        border-radius: 14px;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        .count{
          font-size: 10px;
        }
        .icon-keyboard_arrow_right{
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
          display: inline-block;
          vertical-align: bottom;
        }
      }
    }
    .bulletin-wrapper{
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title{
        vertical-align: top;
        display: inline-block;
        margin-top: 9px;
        width: 22px;
        height: 12px;
        .bg-image('bulletin');
        background-size: cover;
      }
      .bulletin-text{
        vertical-align: top;
        font-size: 10px;
        margin: 0 4px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }
    }
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      filter: blur(10px)
    }
    .detail{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.5);
      z-index: 100;
      overflow: auto;
      transition: all .5s ease;
      backdrop-filter: blur(10px);
      .detail-wrapper{
        min-height: 100%;
        overflow: auto;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 60px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .supports{
            width: 80%;
            margin: 0 auto;
            .support-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: cover;
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
              .text{
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin: 0 auto;
            .content{
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -40px auto 0;
      }
    }
  }

  .fade-enter-to{
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
</style>
