<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
       <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>元
              </div>
            </li>
          </ul>
          <div class="favorite" @click="togglefavorite">
            <span class="icon-favorite" :class="{active: favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="piclist">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'
  import split from '../split/split'
  import BScroll from 'better-scroll'
  export default{
    props: {
      seller: Object
    },
    components: {
      star,
      split
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    data () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        favorite: false
      }
    },
    watch: {
      'seller' () {
        this._initScroll()
        this._initPic()
      }
    },
    mounted () {
      this._initScroll()
      this._initPic()
    },
    methods: {
      togglefavorite () {
        this.favorite = !this.favorite
      },
      _initScroll () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      _initPic () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.piclist.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      }
    }
  }
</script>

<style lang='less'>
  @import '../../common/less/mixin';
  .seller{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      padding: 18px;
      position: relative;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc{
        padding-bottom: 18px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, .1));
        .star{
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text{
          margin-right: 12px;
          line-height: 18px;
          display: inline-block;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark{
        display: flex;
        padding-top: 18px;
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, .1);
          &:last-child{
            border: none;
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 149);
          }
          .content{
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress{
              font-size: 24px;
            }
          }
        }
      }
      .favorite{
        position: absolute;
        right: 18px;
        bottom: 99px;
        width: 50px;
        text-align: center;
        .icon-favorite{
          display: block;
          margin-bottom: 4px;
          color: #d4d6d9;
          line-height: 24px;
          font-size: 20px;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
        .text{
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin{
      padding: 18px 18px 0 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper{
        padding: 0 12px 16px 12px;
        .border-1px(rgb(240, 20, 20));
        .content{
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports{
        .support-item{
          padding: 16px 12px;
          .border-1px(rgba(7, 17, 27, .1));
          font-size: 0;
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 6px;
            background-size: cover;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image('decrease_4');
            }
            &.discount{
              .bg-image('discount_4');
            }
            &.guarantee{
              .bg-image('guarantee_4');
            }
            &.invoice{
              .bg-image('invoice_4');
            }
            &.special{
              .bg-image('special_4');
            }
          }
          .text{
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
    .pics{
      padding: 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
    }
    .info{
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title{
        padding-bottom: 12px;
        line-height: 14px;
        .border-1px(rgba(7, 17, 27, .1));
        font-size: 14px;
      }
      .info-item{
        padding: 16px 12px;
        line-height: 16px;
        .border-1px(rgba(7, 17, 27, .1));
        font-size: 12px;
        &:last-child{
          .border-0px(rgba(7, 17, 27, .1));
        }
      }
    }
  }
</style>
