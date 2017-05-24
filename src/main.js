// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import router from './router';
import axios from 'axios';
import store from "./vuex/store";
import api from "../server/api";
import func from "./public/func";
import AMap from 'vue-amap';
import AmapSearch from 'vue-amap-search';
import 'vue-amap-search/dist/lib/main.css';

Vue.use(AmapSearch)
Vue.prototype.$http = axios;
Vue.prototype.api = api;
Vue.prototype.func = func;
Vue.use(ElementUI);
Vue.use(AMap);
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:9999';
AMap.initAMapApiLoader({
  key: '865d481a98e51cf90cbf2b9f30fae682',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation']
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    axios,
    router,
    store,
    render: h => h(App)
});