<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @navClick="navClick" ref="nav"></detail-nav-bar>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll">
          <detail-swiper :top-images="topImages"></detail-swiper>
          <detail-base-info :goods="goods"></detail-base-info>
          <detail-shop-info :shop="shop"></detail-shop-info>
          <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
          <detail-param-info :param-info="paramInfo" ref="parameter"></detail-param-info>
          <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
<!--          <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>-->
          <goods-list :goods="recommendList" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/content/goods/GoodsList";
    // import BackTop from "components/content/backTop/BackTop";

    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    // import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

    import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";
    import {debounce} from "common/utils";
    import {BACK_POSITION} from "common/const";
    import {backTopMixin} from "common/mixin";
    import {mapActions} from "vuex"

    export default {
        name: "Detail",
        components:{
            GoodsList,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
        },
        mixins:[backTopMixin],
        data(){
            return{
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommendList:[],
                navTop:[],
                getNavAddr:null,
                currentIndex:0,
            }
        },
        created() {
            // console.log(this.$route.params);
            this.iid=this.$route.params.iid

            getDetail(this.iid).then(res=>{
                // console.log(res);
                const data=res.result
                //1.获取顶部轮播图数据
                this.topImages=data.itemInfo.topImages

                //2.获取商品信息
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //3.获取商家信息
                this.shop=new Shop(data.shopInfo)

                //4.获取商品详细信息
                this.detailInfo=data.detailInfo

                //5.商品参数信息
                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

                //6.获取评论信息
                if(data.rate.list){
                    //这里后台所给的都是一条评论
                    this.commentInfo=data.rate.list[0]
                }

                this.getNavAddr=debounce(()=>{
                    this.navTop=[];
                    this.navTop.push(0);
                    this.navTop.push(this.$refs.parameter.$el.offsetTop);
                    this.navTop.push(this.$refs.comment.$el.offsetTop);
                    this.navTop.push(this.$refs.recommend.$el.offsetTop);
                    console.log(this.navTop);
                },50)
            })

            //7.获取详情页面推荐数据
            getRecommend().then((res,error)=>{
                //console.log(res);
                if (error) return
                this.recommendList=res.data.list
            })
        },
        mounted(){
            const refresh=debounce(this.$refs.scroll.refresh,50)
            this.$bus.$on('homeItemImageLoad',()=>{
                refresh()
            })
        },
        methods:{
            ...mapActions(["addCart"]),
            imgLoad(){
                this.$refs.scroll.refresh()
                this.getNavAddr()
            },
            navClick(index){
                // console.log(index);
                this.$refs.scroll.scrollTo(0,-this.navTop[index],200)
            },
            //实现滚动条滚动的指定区域上部的navBar更换标题
            contentScroll(position){
                //1.获取y的位置
                const positionY=-position.y;
                //2.与navTop的值进行比较
                let length=this.navTop.length;
                for(let i=0;i<length;i++){
                    //parseInt(i);
                    // if(positionY>this.navTop[i]&&positionY<this.navTop[i+1]){
                    //     console.log(i);
                    // }

                    //可以在navTop末端添加一个最大的值number.MAX_VALUE,就不用判断最后一个了，上面的
                    // 循环就不用循环最后一个了
                    if(this.currentIndex!==i &&
                        (i<length-1 &&positionY>=this.navTop[i]&&positionY<this.navTop[i+1])
                        ||(i===length-1 &&positionY>=this.navTop[i])){
                        this.currentIndex=i;
                        // console.log(this.currentIndex);
                        this.$refs.nav.currentIndex=this.currentIndex;
                    }
                }

                //3.是否显示回到顶部
                this.isShowBackTop=positionY>BACK_POSITION
            },
            addToCart(){
                //商品加入到购物车
                //1.获取购物车需要展示的信息
                const product={};
                product.image=this.topImages[0];
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.price=this.goods.realPrice;
                product.iid=this.iid;
                //2.将商品加入购物车中
                this.addCart(product).then(res=>{
                    // console.log(res);
                    this.$toast.show(res)
                })
                //类似上面的操作
                /*this.$store.dispatch("addCart",product).then(res=>{
                    console.log(res);
                })*/
            }
        }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 13;
    background-color: #fff;
    /*适应屏幕高度100%*/
    height: 100vh;
  }

  .content{
    /*父元素一定要有高度*/
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }

  .detail-nav{
    position: relative;
    top: 0;
    z-index: 10;
    background-color: #fff;
  }
</style>
