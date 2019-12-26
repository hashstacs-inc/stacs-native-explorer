// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import "babel-polyfill";
import 'element-ui/lib/theme-chalk/index.css';
import 'muse-ui/dist/muse-ui.css';
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './styles/index.scss'
import store from './store';

import JsonViewer from 'vue-json-viewer';
Vue.use(JsonViewer)

// import MuseUI from 'muse-ui';
// Vue.use(MuseUI);

import vueToTop from 'vue-totop'
Vue.use(vueToTop);


import filter from './filters/index.js';
for (const key in filter) {
  if (filter.hasOwnProperty(key)) {
    const element = filter[key]
    Vue.filter(key, element)
  }
}

import i18n from './i18n/index'
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

// import error from '@/components/errorInfo';
// Vue.component('error', error)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
