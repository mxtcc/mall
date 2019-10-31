<template>
  <div id="category">

      <nav-bar class="nav-bar">
          <div slot="center">商品分类</div>
      </nav-bar>

      <div class="content">
          <tab-menu :categories="categories" @selectItem="selectItem" ></tab-menu>
          <scroll id="tab-content" :data="[categoryData]">
            <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          </scroll>
      </div>




  </div>
</template>

<script>

    import NavBar from "components/common/navigationbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";
    import {tabControlMixin} from "common/mixin";
    import {POP,SELL,NEW} from "common/const"

    import TabMenu from "./childComps/TabMenu";
    import TabContentCategory from "./childComps/TabContentCategory";

    import{getCategory,getCategoryDetail,getSubcategory} from "network/category";

    export default {
        name: "Category",
        components:{
            Scroll,
            NavBar,
            TabMenu,
            TabContentCategory,
        },
        mixins:[tabControlMixin],
        data(){
            return{
                categories:[],
                categoryData:{},
                currentIndex:-1
            }
        },
        created() {
            //1.请求分类数据
            this._getCategory()
        },
        computed:{
            showSubcategory(){
                if(this.currentIndex===-1) return{}
                return this.categoryData[this.currentIndex].subcategories
            },
            showCategoryDetail(){
                if(this.currentIndex===-1) return[]
                return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
            }
        },
        methods:{
            /*
            * 数据请求方法
            * */
            _getCategory(){
                getCategory().then(res=>{
                    // console.log(res);
                    //1.获取分类数据
                    this.categories=res.data.category.list
                    //2.初始化每个类别的子数据
                    for(let i=0;i<this.categories.length;i++){
                        this.categoryData[i]={
                            subcategories:{},
                            categoryDetail:{
                                'pop':[],
                                'new':[],
                                'sell':[]
                            }
                        }
                    }
                    //3.请求第一个分类数据
                    this._getSubcategories(0)
                })
            },
            _getSubcategories(index){
                this.currentIndex=index;
                const mailKey=this.categories[index].maitKey;
                getSubcategory(mailKey).then(res=>{
                     // console.log(res);
                    this.categoryData[index].subcategories=res.data
                    this.categoryData={...this.categoryData}
                    this._getCategoryDetail(POP)
                    this._getCategoryDetail(SELL)
                    this._getCategoryDetail(NEW)
                })
            },
            _getCategoryDetail(type){
                //1.获取请求的miniWallkey
                const miniWallkey=this.categories[this.currentIndex].miniWallkey
                //2.发送请求，传入miniWallkey和type
                getCategoryDetail(miniWallkey,type).then(res=>{
                    //3.将获取的数据保存下来
                    this.categoryData[this.currentIndex].categoryDetail[type]=res
                    this.categoryData={...this.categoryData}
                })
            },
            /*
            * 事件处理方法
            * */
            selectItem(index){
                this._getSubcategories(index)
                // console.log(this._getSubcategories(index));
            }
        }
    }
</script>

<style scoped>
  #category{
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #ffffff;
    position: relative;
    z-index: 10;
  }

  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 43px;
    right: 0;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
