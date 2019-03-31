import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './pages/app.vue';
import './css/style.scss';

Vue.use(VueRouter);

const Home = require('./pages/home.vue');
const Detail = require('./pages/detail.vue');
const Chart = require('./pages/chart.vue');

const routers = [
  {
    path: '/',
    name: 'app',
    redirect: '/home',
    component: App,
    children: [
      {
        name: 'home',
        path: '/home',
        component: Home
      }, {
        name: 'detail',
        path: '/detail/:id/:name', // 动态路由匹配
        component: Detail
      }, {
        name: 'chart',
        path: '/chart',
        component: Chart
      }
    ]
  }
];
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routers
});

new Vue({
  router,
  el: '#app',
  template: `
  <div id="app">
      <router-view class="view"></router-view>
  </div>
  `
}).$mount('#app');
