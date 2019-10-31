import axios from 'axios'


export function request(config){
  //其本身就是promise
  const instance=axios.create({
    baseURL:'http://106.54.54.237:8000',
    timeout:5000
  })
  //axios拦截器(requset请求时拦截；
  instance.interceptors.request.use(config=>{

    //拦截后要放出数据，1.拦截只是为了更好地筛选信息,2.还可以为正在加载的资源播放加载页面，在响应拦截中关闭
    //3.某些网络请求（登录（token）），必须携带一些特殊的信息
    return config
  },err=>{
    console.log(err);
  })

  //响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })


  //发送网络请求
  return instance(config)
}


