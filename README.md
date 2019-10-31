# mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

使用better-scroll-------isScroll   滚动for web

# 首页组件页面开发

在一个子组件中监听事件需要另外一个组件的方法

1.  将这个子组件自定义事件传送至父组件进行处理，另一个组件的方法在传到父组件
2.修饰符.native修饰符
    在我们需要监听一个组件原生事件时，必须给对应事件加上.native，才能进行监听
    
## 三.首页商品数据的请求

###     3.1.设计数据结构，用于保存数据

###     3.2.发送数据请求

## 四.对商品数据的展示

### 4.1.封装GoodsList.vue组件

v-for:goods--->goods[30]

### 4.2封装GoodsItem.vue组件

good的内容，去除图片标题价格....封装dom元素中，美化样式

## 五.对滚动的重构  better-scroll

元素结构  wrapper--->content---->li.......   设置wrapper高度
监听滚动
上拉加载更多
click点击原生的

### 5.2在项目中使用

better-scroll封装(防止插件后期不进行更新，方便日后更改插件)
注意：父子组件之间相互传送数据     父--->子  props     子-->父 事件自定义
home.vue(probeType)----->scroll.vue(position)--->home.vue   判断是不是达到指定位置，进行显示v-show='true''

## 六.回到顶部backTop功能

## 七处理bug问题

better-scroll没能及时刷新可滚动高度，scrollHeight，刚开始没有将图片高度加载进来，可滚动高度错误后来图片加载进来，有了新高度，scrollHeight未及时刷新

**问题解决方案**

监听每一张图片的加载，加载完成就refresh()

监听图片加载

​	原生JS-------img.onload=function()

​	vue方法----- @load='xxx'   xxx(){}     scroll.vue refresh()-->这里要去拿scroll.vue  this.scroll.refresh(**vuex的事件总线**)

​	event bus

![event_bus](.\README_IMG\event_bus.png)



**创建事件总线**

​		在全局main.js中声明全局$bus

​		Vue.prototype.$bus=new Vue()****

**防抖函数**

​		节流throttle

​		防抖debounce

```js
debounce(func,delay){
                let timer=null
                return function(...args){
                    if(timer) clearTimeout(timer)
                    timer=setTimeout(()=>{
                        func.apply(this,args)
                    },delay)
                }
            },
```

减少执行频率较高的函数，新生成函数并不会非常频繁调用，如果下一次执行的很快，那么会将上一次取消掉

## 八.tabControl的吸顶效果

### 8.1获取tabControl的offsetTop

需要知道滚动到多少，才有吸顶效果

这里需要知道上方的图片是否加载完成，从而获取正确的offsetTop的值

HomeSwipe.vue---@load自定义事件传函数--->Home.vue

在图片加载完成之后，保存offsetTop值

### 8.2设置在offsetTop处吸顶

1.动态绑定class（不可用）

由于better-scroll的机制，会出现tabControl依旧改变位置

2.多个元素掩盖显示与隐藏

复制tabControl,在达到offsetTop的时候，显示元素；反之隐藏

## 九.让Home保持原来的状态

### 9.1让home不要随意销毁

keep-alive

### 9.2让home中的内容保持原来的位置

离开时，保存位置信息saveY

进来时，将位置设置为原来的位置

# 详情页面



