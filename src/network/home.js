import {request} from "./request";
//次home页层封装，把繁琐的网络请求封锁在这个模块中
export function getHomeMultidata(){
  return request({
    url:'/api/v1/home/multidata'
  })
}
export function getHomeGoods(type,page){
  return request({
    url: '/api/v1/home/data',
    params:{
      type,
      page
    }
  })
}
