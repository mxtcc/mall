<template>
    <div class="cart-list">
      <Scroll class="content" ref="scroll">
        <cart-list-item
          v-for="(item,index) in cartList"
          :item-info="item"
          :key="index"></cart-list-item>
      </Scroll>
    </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  import {mapGetters} from "vuex"

    export default {
        name: "CartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            ...mapGetters(['cartList'])
        },
        activated() {
            //再次回到购物车页面时，进行滚动高度刷新
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
