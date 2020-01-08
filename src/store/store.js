import Vue from 'vue'
import Vuex from 'vuex'
import userState from './modules/userState'
import api from './modules/api'
import sweetAlert from './modules/sweetAlert'
import memberInfo from './modules/memberInfo'
import token from './modules/token'
import navibar from './modules/navibar'
import buff from './modules/buff'
import accountNav from './pagesController/accountNav'
import modalControl from './pagesController/modalControl'
import login from './pagesController/login'
import contractShop from './pagesController/contractShop'
import naviBar from './pagesController/naviBar'
import editForm from './pagesController/editForm'
import subNav from './pagesController/subNav'
import exchangeRate from './modules/exchangeRate'
import modalControlOne from './pagesController/modalControlOne'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userState,
    api,
    sweetAlert,
    memberInfo,
    navibar,
    token,
    accountNav,
    modalControl,
    modalControlOne,
    login,
    contractShop,
    naviBar,
    editForm,
    subNav,
    buff,
    exchangeRate
  }
})
