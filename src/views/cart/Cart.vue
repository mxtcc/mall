<template>
    <div class="cart">
<!--      导航-->
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
<!--      商品列表-->
      <cart-list></cart-list>
<!--      底部汇总-->
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
  import NavBar from "components/common/navigationbar/NavBar";
  import CartBottomBar from "./childComps/CartBottomBar";

  import CartList from "./childComps/CartList";

  //vuex将store中getters都变成计算属性
  import {mapGetters} from "vuex";

    export default {
        name: "Cart",
        components:{
            CartList,
            NavBar,
            CartBottomBar
        },
        computed:{
            /*cartLength(){
                return this.$store.state.cartList.length;
            }*/
            //第一种写法
            // ...mapGetters(['cartLength','cartList'])
            //第二种写法
            ...mapGetters({
                length:"cartLength",
                list:"cartList"
            })
        }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>
