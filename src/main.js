/*
 * @Descripttion: zong
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-13 11:45:47
 * @LastEditors: pj
 * @LastEditTime: 2023-06-23 20:31:22
 */
// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import '@/assets/fonts/iconfont/iconfont.js'
import IconSvg from '@/components/IconSvg'

Vue.config.productionTip = false
Vue.component('icon-svg', IconSvg)
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex, Logo message
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

window.vm = new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex, Logo message
  component: { App },
  template: '<App/>'
})
