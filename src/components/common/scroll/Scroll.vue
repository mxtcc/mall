<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from "better-scroll"
    export default {
        name: "Scroll",
        props:{
            //滚动监听的类型
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return{
                scroll:null
            }
        },
        //当所有组件都加载完成时进行调用
        mounted() {
            //通过元素获取，页面中会使用好多类似的组件，类名也是相似
            //元素中有 ref属性，可以获取元素对象
            //元素和组件上绑定可以通过 this.$refs.refname 获取到元素对象或组件对象
            this.scroll=new BScroll(this.$refs.wrapper,{
                //实时监听滚动的位置
                click:true,
                //动态封装监听滚动的状态（props传出）节省属性性能
                probeType:this.probeType,
                pullUpLoad: this.pullUpLoad
            })
            //1.实时监听滚动位置
            if(this.probeType===2||this.probeType===3){
                this.scroll.on("scroll",(position)=>{
                    // console.log(position);
                    this.$emit('scroll',position);//子组件向父组件传递数据
                })
            }

            //2.监听上拉刷新
            if(this.pullUpLoad){
                this.scroll.on("pullingUp",()=>{
                    this.$emit('pullingUp')
                })
            }
        },
        methods:{
            //滚动至多少，时间为毫秒  封装this.scroll中的scrollTop方法
            scrollTo(x,y,time=300){
                //判断scroll.vue的scroll对象是否传来
                this.scroll&&this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll&&this.scroll.finishPullUp()
            },
            refresh(){
                // console.log('res');
                this.scroll&&this.scroll.refresh()
            },
            getScrollY(){
                return this.scroll?this.scroll.y:0;
            }
        }
    }
</script>

<style scoped>

</style>
