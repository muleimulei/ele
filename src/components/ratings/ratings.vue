<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length > 0">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from 'common/js/date.js'
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  Vue.filter('formDate', (time) => {
    let date = new Date(time)
    return formatDate(date, 'yyyy-MM-dd hh:mm')
  })
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        // console.log(response)
        response = response.data
        if (response.errno === 0) {
          this.ratings = response.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
    }
  }
</script>

<style lang='less'>
  @import '../../common/less/mixin';
  .ratings{
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      display: flex;
      padding: 18px 0;
      .overview-left{
        flex: 0 0 120px;
        padding: 6px 0;
        width: 120px;
        border-right: 1px solid rgba(7, 17, 27, .1);
        text-align: center;
        @media only screen and (max-width: 320px){
          flex: 0 0 120px;
          width: 120px;
        }
        .score{
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title{
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank{
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right{
        flex: 1;
        padding-left: 12px;
        @media only screen and (max-width: 320px){
          padding-left: 6px;
        }
        .score-wrapper{
          margin-bottom: 8px;
          line-height: 18px;
          font-size: 0;
          .title{
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star{
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }
          .score{
            display: inline-block;
            font-size: 12px;
            color: rgb(255, 153, 153);
          }
        }
        .delivery-wrapper{
          font-size: 0;
          .title{
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery{
            font-size: 12px;
            color: rgb(147, 153, 153);
            margin-left: 12px;
          }
        }
      }
    }
    .rating-wrapper{
      padding: 0 18px;
      .rating-item{
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .avatar{
          margin-right: 12px;
          img{
            border-radius: 50%;
          }
        }
        .content{
          position: relative;
          flex: 1;
          .name{
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
  }
</style>
