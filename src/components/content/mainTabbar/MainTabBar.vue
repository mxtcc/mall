<template>
  <tab-bar>
    <tab-bar-item path="/home" >
<!--      应用重定向的路径时，不是import引用需要加~，因为是在html中找相对路径-->
      <img slot="item-img" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/home(1).svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-img" src="~assets/img/tabbar/menu.svg" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/menu(1).svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-img" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/cart(1).svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile">
      <img slot="item-img" src="~assets/img/tabbar/user.svg" alt="">
      <img slot="item-img-active" src="~assets/img/tabbar/user(1).svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
    import TabBar from "components/common/tabbar/TabBar";
    import TabBarItem from "components/common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>
