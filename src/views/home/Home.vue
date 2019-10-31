<template>
    <div id="home">

      <nav-bar class="home-nav"><div slot="center">蘑菇街</div></nav-bar>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   v-show="isTabFixed"></tab-control>

      <scroll class="content" ref="scroll"
              :probe-type="probe"
              @scroll="contentScroll "
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view></feature-view>
        <tab-control
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"></tab-control>

        <goods-list :goods="showGoods"></goods-list>
      </scroll>
<!--      ul>li{列表$}*50    tab-->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>

</template>

<script>
  //公共组件
  import NavBar from "components/common/navigationbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  //子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";
  //方法
  import{
      getHomeMultidata,
      getHomeGoods
  } from "network/home";
  import {debounce} from "common/utils";


  export default {
        name: "Home",
        components: {
            TabControl,
            NavBar,
            HomeSwiper,
            HomeRecommendView,
            FeatureView,
            GoodsList,
            Scroll,
            BackTop
        },
        data(){
            //这里面的变量不会轻易被回收
            return{

                banners:[],
                recommends:[],
                goods:{
                    'pop':{page:0,list:[],y:0},
                    'new':{page:0,list:[],y:0},
                    'sell':{page:0,list:[],y:0}
                },
                currentType:'pop',
                //probeType类型的值
                probe:3,
                //返回顶部按钮的显示与隐藏
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0,
            }
        },
      computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
      },
        activated(){
            this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0,this.saveY,0)
        },
      deactivated(){
            this.saveY=this.$refs.scroll.getScrollY()
          // console.log(this.saveY);
      },
        //组件创建时，生命周期函数
        created() {

            // created 是有this的，this的作用域的找法是向上一级进行寻找知道找到this
            //created 中的this指的是当前组件的对象    在这里只需要写总体上的逻辑，具体实现在methods里实现
            //1.请求多个数据
            this.getHomeMultidata()

            //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')



        },
      //所有组件挂载完成的时候，图片不一定全部都能加载完成
      mounted(){
          //3.监听图片加载事件
          // this.$bus.$on('itemImageLoad',()=>{
          //     this.$refs.scroll.refresh()
          //     // console.log('-----')
          // })
          //1.图片加载完成的事件监听
          const refresh=debounce(this.$refs.scroll.refresh,50)
          this.$bus.$on('homeItemImageLoad',()=>{
              refresh()
          })
          //2.获取tabControl的offsetTop
          //所有组件中都有一个共同的属性$el,y用于获取组件中的元素
          //methods-->swiperImageLoad()

      },
      methods:{
            /*
            * 事件监听的方法
            * */
            //防抖函数
            /*debounce(func,delay){
                let timer=null
                return function(...args){
                    if(timer) clearTimeout(timer)
                    timer=setTimeout(()=>{
                        func.apply(this,args)
                    },delay)
                }
            },*/
            tabClick(index){

                switch (index) {
                    case 0:
                        this.currentType='pop'
                        break
                    case 1:
                        this.currentType='new'
                        break
                    case 2:
                        this.currentType='sell'
                        break
                }
                this.$refs.tabControl1.currentIndex=index;
                this.$refs.tabControl2.currentIndex=index;

            },
            backClick(){
                //this.$refs.scroll可以取出组件中的属性和方法
                this.$refs.scroll.scrollTo(0,0)
            },
            contentScroll(position){
                // console.log(position); home.vue打印
                //1.判断BackTop是否显示
                this.isShowBackTop=(-position.y)>800

                //2.判断tabControl是否吸顶
                this.isTabFixed=(-position.y)>this.tabOffsetTop

                //3.记录当前滚动位置
            },
            loadMore(){
                // console.log("加载更多"); 在home.vue里面打印
                //选中哪个nav就加载哪个数据
                this.getHomeGoods(this.currentType)
                //图片加载结束之后，刷新可滚动区域大小
                this.$refs.scroll.scroll.refresh()
            },
            swiperImageLoad(){
                // console.log(this.$refs.tabControl.$el.offsetTop);
                this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
            },

            /*
            * 网络请求相关的方法
            * */
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    //这里为异步操作

                    this.banners=res.data.banner.list;
                    this.recommends=res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                //属性为参数要以[ ]代替 . ，不然对象里面会找不到属性
                //获取下一页的page值
                let page=this.goods[type].page+1
                getHomeGoods(type,page).then(res=>{
                    //...解构赋值，将数组中的元素逐一取出，...是可变参    一页数据有30条
                    this.goods[type].list.push(...res.data.list);
                    //更改page+1
                    this.goods[type].page+=1

                    this.$refs.scroll.finishPullUp()
                })
            }
      }
  }
</script>
<!-- style scoped是样式作用域-->
<style scoped>

  #home{
    /*权重计算方式为1*100=100*/
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  /*  vh --viewheight视图的高度100%*/
  }
  #home .home-nav{
    /*权重计算方式为1*100+1*10=110*/
    background: var(--color-tint);
    color: #ffffff;
    z-index: 10;
    /*在原生浏览器中滚动时使用*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
  }
  .tab-control{
    position: relative;
    top:-1px;
    /*z-index只对定位元素起效果*/
    z-index: 9;
  }
  /*在引用better-scroll之后就失效了*/
  /*.tab-control{
    !*设置效果滑动时至在顶部top位置position自动更改为fixed，很多浏览器不支持，但移动端支持*!
    position: sticky;
    top: 44px;
    z-index: 10;
  }*/
  /*.content{*/
  /*动态计算高度*/
  /*  height: calc(100% - 93px); */
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  /*相对定位解决*/
  .content{
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*background: #ffffff;*/
  }
</style>
