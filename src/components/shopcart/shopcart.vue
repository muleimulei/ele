<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">
          ￥0
        </div>
        <div class="desc">
          
        </div>
      </div>
      <div class="content-right"></div>
    </div>    
  </div>
</template>

<script>

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
            .icon-shopping_cart{
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
            }
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
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
      }
    }
  }
</style>
