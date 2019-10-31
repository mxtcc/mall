<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
        <slot name="item-img"></slot>
      </div>
      <div v-else>
        <slot name="item-img-active"></slot>
      </div>
      <div :class="{active:isActive}" :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
      <!--<img src="../../assets/img/tabbar/home.svg" alt="">
      <div>首页</div>-->
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'#ff8198'
            }
        },
        data(){
            return{
                //isActive:true
            }
        },
        computed:{
            isActive(){
                //indexOf返回-1时，在其中没有找到，反之则找到
                return this.$route.path.indexOf(this.path)!==-1
            },
            activeStyle(){
                return this.isActive ? {color:this.activeColor} : {}
            }
        },
        methods:{
            itemClick(){
              this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
  .active{
    color: #ff8198;
  }
</style>
