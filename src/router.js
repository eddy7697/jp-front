import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import Login from './views/Login.vue'
import Game from './views/Game.vue'
import Trade from './views/Trade.vue'
import Mall from './views/Mall.vue'
import Group from './views/Group.vue'
import Account from './views/Account.vue'
import Deposit from './views/Deposit.vue'
import Receive from './views/Receive.vue'
import NewestPage from './views/NewestPage.vue'
import ContractShop from './views/ContractShop.vue'
import editUserForm from './views/editUserForm.vue'
import levelInfo from './views/levelInfo.vue'
import Registration from './views/Registration.vue'
import RegistrationRules from './views/RegistrationRules.vue'
import mainPage from './views/mainPage.vue'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}


export default new Router({
  routes: [
    {
      path: '*',
      name: '/',
      component: loadView('Login')
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: loadView('System')
    },
    {
      path: '/Login',
      name: 'login',
      component: loadView('Login')
    },
    {
      path: '/registration',
      name: 'registration',
      component: loadView('Registration')
    },
    {
      path: '/Deposit',
      name: 'deposit',
      component: loadView('Deposit')
    },
    {
      path: '/Newest',
      name: 'newest',
      component: loadView('NewestPage')
    },
    {
      path: '/Map',
      name: 'map',
      component: Map
    },
    {
      path: '/RegistrationRules',
      name: 'registrationRules',
      component: loadView('RegistrationRules')
    },
    {
      path: '/game',
      name: 'game',
      component: loadView('Game')
    },
    {
      path: '/Trade',
      name: 'trade',
      component: loadView('Trade')
    },
    {
      path: '/Mall',
      name: 'mall',
      component: loadView('Mall')
    },
    {
      path: '/Group',
      name: 'group',
      component: loadView('Group')
    },
    {
      path: '/Account',
      name: 'account',
      component: loadView('Account')
    },
    {
      path: '/receivePage',
      name: 'receivePage',
      component: loadView('Receive')
    },
    {
      path: '/contractShop',
      name: 'contractShop',
      component: loadView('ContractShop')
    },
    {
      path: '/editUserForm',
      name: 'editUserForm',
      component: loadView('editUserForm')
    },
    {
      path: '/levelInfo',
      name: 'levelInfo',
      component: loadView('levelInfo')
    },
    {
      path: '/System',
      name: 'System',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/System.vue')
    }
  ]
})


