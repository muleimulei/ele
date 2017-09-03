<template>
  <div id="app">
   <appHead :seller = "seller"></appHead>
   <div class="tab">
     <div class="item-tab">
        <router-link to="/goods">商品</router-link>
     </div>
     <div class="item-tab">
        <router-link to="/ratings">评论</router-link>
     </div>
     <div class="item-tab">
        <router-link to="/sellers">商家</router-link>
     </div>
   </div>
   <keep-alive>
     <router-view :seller="seller"></router-view>
   </keep-alive>
  </div>
</template>

<script>
import appHead from './components/header/header.vue'
import {urlParse} from 'common/js/util'
const ERR_OK = 0
export default {
  name: 'app',
  components: {
    appHead
  },
  data () {
    return {
      seller: {
        id: (function () {
          let param = urlParse()
          return param.id
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/sellers?id=' + this.seller.id).then((response) => {
      response = response.data
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
        console.log(this.seller.id)
      }
    })
  }
}
</script>

<style lang='less'>
@import 'common/less/index.less';
#app {
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .item-tab{
      text-align: center;
      flex: 1;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active{
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
