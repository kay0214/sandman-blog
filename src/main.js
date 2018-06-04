// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import globalObj from './common/globalObj'
import MyHeader from './components/header/MyHeader'
import axios from 'axios'
import message from './common/message'

Vue.component('MyHeader', MyHeader)
Vue.config.productionTip = false
Vue.prototype.globalObj_ = globalObj
Vue.use(ElementUI)

Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://39.104.80.30:8081'
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.withCredentials = true
axios.interceptors.response.use((success) => {
  if (success.data.code !== 200 && success.data.code !== 419) {
    message.errorMsg('错误代码:' + success.data.code, success.data.message) // elementUI的弹框
    return success
  } else {
    return success
  }
}, (error) => {
  message.errorMsg('服务器错误', JSON.stringify(error))
  return null
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
