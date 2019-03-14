// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import qs from 'qs'
import $ from  'jquery';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font_q9euw372ni/iconfont.css';
import './assets/font_rj6apj8q8o/iconfont.css';
import Echarts from 'echarts'

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$echarts = Echarts;
Vue.prototype.$qs=qs;
Vue.prototype.$axios=Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=> h(App),
});
