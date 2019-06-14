
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Axios from 'axios'
import vueAxios from 'vue-axios'
import vueCookie from 'vue-cookies'
import infiniteScroll from 'vue-infinite-scroll'

//引入的框架
import Signin from './components/Signin'
import Signup from './components/Signup'
import Board from './components/Board'
import Notification from './components/Notification'
import Thread from './components/Thread'
import Profiles from './components/Profiles'
import Domain from './domain.js'

//引入后台的框架
import AdminBoard from './components/admin/Board'



Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(mavonEditor);
Vue.use(vueAxios, Axios);
Vue.use(vueCookie);
Vue.use(infiniteScroll);

Vue.axios.defaults.withCredentials = true;
Vue.prototype.GLOBAL_API = Domain;

const routers = new VueRouter({
  routes: [
    { path: '/', component:Board},
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/notification', component: Notification},
    { path: '/thread/:tid', component: Thread},
    { path: '/profiles', component: Profiles},
    { path: '/admin/', component: AdminBoard},

  ]
});



new Vue({
  render: h => h(App),
  router: routers,
}).$mount('#app');

