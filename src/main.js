import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'

//引入的框架
import Signin from './components/Signin'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routers = new VueRouter({
  routes: [
    { path: '/signin', component: Signin }
  ]
});

new Vue({
  render: h => h(App),
  router: routers
}).$mount('#app')
