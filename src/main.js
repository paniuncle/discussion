import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'

//引入的框架
import Signin from './components/Signin'
import Signup from './components/Signup'
import Board from './components/Board'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routers = new VueRouter({
  routes: [
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/', component:Board}
  ]
});

new Vue({
  render: h => h(App),
  router: routers
}).$mount('#app')
