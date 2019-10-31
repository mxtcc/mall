import {request} from "./request";
//获取详情页面数据
export function getDetail(iid){
  return request({
    url:'/api/v1/detail',
    params:{
      iid,
    }
  })
}

//获取详情页的推荐页面

export  function getRecommend(){
  return request({
    url:'/api/v1/recommend'
  })
}
//商品对象
export class Goods{
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discountDesc
    this.columns=columns
    this.services=services
    this.realPrice=itemInfo.lowNowPrice
  }
}
//商家信息对象
export class Shop {
  constructor(shopInfo){
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.score=shopInfo.score
    this.goodsCount=shopInfo.cGoods
  }
}

//商品参数信息对象
export class GoodsParam{
  constructor(info,rule){
    //图片可能有的商品没有
    this.image=info.images?info.images[0]:''
    this.infos=info.set
    this.size=rule.tables
  }
}
