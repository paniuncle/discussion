import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//引入的框架
import Signin from './components/Signin'
import Signup from './components/Signup'
import Board from './components/Board'
import Notification from './components/Notification'
import Thread from './components/Thread'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(mavonEditor);


const routers = new VueRouter({
  routes: [
    { path: '/', component:Board},
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/notification', component: Notification},
    { path: '/thread', component: Thread}

  ]
});

new Vue({
  render: h => h(App),
  router: routers
}).$mount('#app')
