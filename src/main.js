// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import router from './router'
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  if(to.path == '/'){
    sessionStorage.removeItem('login')
  }
  const login = JSON.parse(sessionStorage.getItem('login'));
  if(!login && to.path != '/'){
    next({
      path: '/'
    })
  }
  else{
    next()
  }
});

//Vue.use(officegen);
//Vue.prototype.$officegen = officegen

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
