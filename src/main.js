import Vue from 'vue'
import App from './App.vue'
// import Maintain from './Maintain.vue'
// import Registration from './Registration'
import api from './api'
import router from './router'
import store from './store/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import { VueHammer } from 'vue2-hammer'
import { languageSet } from '@/assets/js/language'

Vue.use(VueHammer)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueClipboard)

var DEBUG = process.env.VUE_APP_DEBUG;
if(DEBUG == 'false'){
    if(!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for(var i=0;i<methods.length;i++){
        console[methods[i]] = function(){};
    }
}

const getP = (queryString) => {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

console.log(languageSet)
new Vue({
  router,
  store,
  api,
  languageSet,
  render: h => h(App)
}).$mount('#app')
document.getElementById('maintain').style.display = 'none'

// window.location = '/#/&maintain=true'
// window.location = 'http://localhost:8080/#/?Registration=true&auth=1234'
// var params = getP(window.location.href)
// if (params['maintain']) {
//   new Vue({
//     router,
//     store,
//     render: h => h(Maintain)
//   }).$mount('#maintain')
//   document.getElementById('app').style.display = 'none'
// } else if (!params[maintain]) {
//   new Vue({
//     router,
//     store,
//     api,
//     render: h => h(App)
//   }).$mount('#app')
//   document.getElementById('maintain').style.display = 'none'
// }


