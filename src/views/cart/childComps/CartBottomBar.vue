<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button
          class="check-button"
          :is-checked="isSelectAll"
          @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="price">
        合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
        去计算：{{checkLength}}
      </div>
    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex"
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton,
        },
        computed:{
            ...mapGetters(['cartList']),
            totalPrice(){
                return "￥"+ this.$store.state.cartList.filter(item=>{
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue+(item.price*item.count)
                },0)
            },
            checkLength(){
                return this.cartList.filter(item=>item.checked).length
            },
            isSelectAll(){
                //return !(this.cartList.filter(item=>!item.checked).length)//有不被选中的为false
                if(this.cartList.length===0) return false;
                return !(this.cartList.find(item=>!item.checked))
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){//全部选中时
                    this.cartList.forEach(item=>item.checked=false)
                }else{//部分选中或全部不选
                    this.cartList.forEach(item=>item.checked=true)
                }
            },
            calcClick(){
                if(!this.isSelectAll){
                    this.$toast.show('请选择购买的商品')
                }
            }
        }
    }
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }
  .price{
    margin-left: 35px;
    flex: 1;
  }
  .calculate{
    width: 100px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>
