import axios from 'axios'
const swal = require('sweetalert2')
import router from './../../router'
import { languageSet } from '../../assets/js/language'

const state = {
  'client_id': '922301cb2254401cc84399578ec473de',
  'client_secret': 'a7428d49d6d40dee87f43c4588154f0c'
}
axios.interceptors.response.use((config) => {
  // console.log('平常', config)
  if(config.headers.authorization){
    // console.log('更新auth',config.headers.authorization)
    localStorage.setItem('Authorization', config.headers.authorization)
  }
  if(config.headers.identity) {
    // console.log('更新Identity',config.headers.identity)
    localStorage.setItem('identity', config.headers.identity)
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});


const getters = {

}

const errorAuth = () => {
  swal.fire({
      title: 'Error!',
      text: languageSet['SUCCESSLOGOUT'],
      type: 'error',
      confirmButtonText: languageSet['CONFIRMTXT']
  }).then(function(){
    window.location.href = '/'
  })
}

const actions = {
  ecPostApi({commit, state}, data) {
    this.dispatch('busyLoading', true)
    let api = new Promise ((res, rej)=>{
      axios.post(data['url'], data, {
      })
      .then((response) => {
        console.log(response)
        res({
          result: 'success',
          data: response.data['data']
        });
      })
      .catch((error) => {
        res({
          result: 'error',
          errorMsg: error.response.data
        });
      })
    })
    return api.then((result)=>{
      this.dispatch('busyLoading', false)
      return result;
    })
  },
  updateApiState({commit, state}, payload) {
    state = payload
  },
  postApi({commit, state}, data) {
    this.dispatch('busyLoading', true)
    let api = new Promise ((res, rej)=>{
      axios.post(`${process.env.VUE_APP_API_URL + data['url']}`, data, {
        headers: {
          'Authorization': data['Authorization'],
          'Identity': data['identity_token']
        }
      })
      .then((response) => {
        res({
          result: 'success',
          data: response.data['data']
        });
      })
      .catch((error) => {
        res({
          result: 'error',
          errorMsg: error.response.data
        });
      })
    })
    return api.then((result)=>{
      this.dispatch('busyLoading', false)
      return result;
    })
  },
  getApi({commit, state}, data) {
    this.dispatch('busyLoading', true)
    let api = new Promise ((res, rej)=>{
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL + data['url']}`,
        headers: {
          'Authorization': localStorage.getItem('Authorization'),
          'Identity': localStorage.getItem('identity'),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((response) => {
        res({
          result: 'success',
          data: response.data['data']
        });
      })
      .catch((error) => {
        console.log(error)
        if(error.response.status == 401){
          errorAuth()
          return 
        }
        res({
          result: 'error',
          errorMsg: error
        });
      })
    })
    return api.then((result)=>{
      this.dispatch('busyLoading', false)
      return result;
    }).catch((error) => {
      window.location.href = '/'
      res({
        result: 'error',
        errorMsg: error
      });
    })
  },
  putApi({commit, state}, data) {
    this.dispatch('busyLoading', true)
    let api = new Promise ((res, rej)=>{
      axios({
        method: 'put',
        url: `${process.env.VUE_APP_API_URL + data['url']}`,
        headers: {
          'Authorization': localStorage.getItem('Authorization'),
          'Identity': localStorage.getItem('identity'),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data
      })
      .then((response) => {
        res({
          result: 'success',
          data: response.data['data']
        });
      })
      .catch((error) => {
        if(error.response.status == 401){
          errorAuth()
          return 
        }
        res({
          result: 'error',
          errorMsg: error.response.data
        });
      })
    })
    return api.then((result)=>{
      this.dispatch('busyLoading', false)
      return result;
    }).catch((error) => {
      res({
        result: 'error',
        errorMsg: error.response.data
      });
    })
  },
  delApi({commit, state}, data) {
    this.dispatch('busyLoading', true)
    let api = new Promise ((res, rej)=>{
      axios({
        method: 'delete',
        url: `${process.env.VUE_APP_API_URL + data['url']}`,
        headers: {
          'Authorization': localStorage.getItem('Authorization'),
          'Identity': localStorage.getItem('identity'),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((response) => {
        res({
          result: 'success',
          data: response.data['data']
        });
      })
      .catch((error) => {
        if(error.response.status == 401){
          errorAuth()
          return 
        }
        res({
          result: 'error',
          errorMsg: error.response.data
        });
      })
    })
    return api.then((result)=>{
      this.dispatch('busyLoading', false)
      return result;
    }).catch((error) => {
      res({
        result: 'error',
        errorMsg: error.response.data
      });
    })
  }
}

const mutations = {
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}
