import Vue from "vue";
import VueRouter from "vue-router";
import App from "./pages/app.vue";
import "./css/style.scss";
Vue.use(VueRouter);
const Home = require("./pages/home.vue");
const Detail = require("./pages/detail.vue");
const router = new VueRouter({
    mode: "hash",
    base: __dirname,
    routes: [
        {
            path: "/",
            name: "lzugis",
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
                    path: '/detail/:id/:name',
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
