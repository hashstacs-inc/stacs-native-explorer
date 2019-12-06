// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import 'muse-ui/dist/muse-ui.css';
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './styles/index.scss' //全局CSS
import MuseUI from 'muse-ui';
import store from './store';
import error from '@/components/errorInfo';
import vueToTop from 'vue-totop'
import filter from './filters/index.js';
for (const key in filter) {
  if (filter.hasOwnProperty(key)) {
    const element = filter[key]
    Vue.filter(key, element)
  }
}

Vue.use(vueToTop);
Vue.use(MuseUI);
Vue.use(ElementUI, { locale });
Vue.component('error', error)

Vue.config.productionTip = false

// 全局混入错误提示框
Vue.mixin({
  methods: {
    ShowErrorInfo(info) {
      var error = Vue.extend({
        template: '<error :txid="info"/>',
        data() {
          this.info = info;
          return {}
        }
      });
      document.getElementById('app').appendChild(new error().$mount().$el);
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
