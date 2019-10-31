import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/store";
import toast from "components/common/toast";
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";


Vue.config.productionTip = false
//全局事件总线
Vue.prototype.$bus=new Vue()
//安装toast插件
Vue.use(toast);

//解决移动端300ms延时问题
FastClick.attach(document.body);

//使用懒加载插件
Vue.use(VueLazyload,{
  loading: import('./assets/img/common/placeholder.jpg')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
