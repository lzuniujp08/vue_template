import Vue from "vue";
import VueRouter from "vue-router";
import App from "./pages/app.vue";
import "./css/style.scss";
Vue.use(VueRouter);
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
const Home = require("./pages/home.vue");
const Detail = require("./pages/detail.vue");
const router = new VueRouter({
    mode: "hash",
    base: __dirname,
    routes: [
        {
            path: "/",
            name: "app",
            redirect: '/home',
            component: App,
            children: [
                {
                    name: "home",
                    path: "/home",
                    component: Home
                },
                {
                    name: 'detail',
                    path: '/detail/:id',
                    component:Detail
                }
            ]
        }
    ]
});

new Vue({
    router,
    el: "#app",
    template: `
  <div id="app">
      <router-view class="view"></router-view>
  </div>
  `
}).$mount("#app");
