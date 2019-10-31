<template>
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    /*内部有内容时可以撑起div的高度*/
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,.08);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>
