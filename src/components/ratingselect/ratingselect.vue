<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" @click="select(2)" :class="{active: sType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0)" :class="{active: sType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1)" :class="{active: sType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{on: oContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        sType: this.selectType,
        oContent: this.onlyContent
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select (num) {
        this.sType = num
        this.$emit('typechange', num)
      },
      toggleContent () {
        this.oContent = !this.oContent
        this.$emit('contentchange', this.oContent)
      }
    }
  }
</script>

<style lang="less">
  @import '../../common/less/mixin';
  .ratingselect{
    .rating-type{
      padding: 18px 0;
      margin: 0 18px;
      .border-1px(rgba(7, 17, 27, .1));
      font-size: 0;
      .block{
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        &.active{
          color: white;
        }
        &.positive{
          background: rgba(0, 160, 220, .2);
          &.active{
            background: rgb(0, 160, 220);
          }
        }
        &.negative{
          background: rgba(77, 85, 93, .2);
          &.active{
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on{
        .icon-check_circle{
          color: rgb(0, 160, 220);
        }
      }
      .icon-check_circle{
        margin-right: 4px;
        font-size: 24px;
        vertical-align: top;
        display: inline-block;
      }
      .text{
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
