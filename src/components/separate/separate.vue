<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{message}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default{
    props: {
      message: String
    }
  }
</script>

<style lang="less">
  .title{
    display: flex;
    width: 80%;
    margin: 28px auto 24px;
    .line{
      flex-grow: 1;
      position: relative;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
      top: -6px;
    }
    .text{
      padding: 0 12px;
      font-size: 10px;
      font-weight: 700;
    }
  }
</style>