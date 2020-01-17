<template>
  <div class="LoginForm">
    <div class="row">
      <div class="container">
        <div class="login-form">

            <div class="form-group">
              <label for="language">{{txT.LANGUAGE}}</label>
              <select @change="changeLan()" v-model="lang" class="form-control" id="language">
                <option value="">select language</option>
                <option value="ch-tw">中文</option>
                <option value="JP">日本語</option>
              </select>
            </div>  

            <div class="form-group text-left">
                <label for="username">{{txT.ACCOUNT}}</label>
                <input v-model="account" type="text" placeholder="預設為手機號碼" name="username" id="username" required>
            </div>

            <div class="form-group password-area text-left">
                <label for="password text-left">{{txT.PASSWORD}}</label>
                <input v-model="password" type="password" placeholder="" name="password" id="password" required>
            </div>  
            
            <div class="form-group remember-area">
                <div>
                  <input @click="clickRemeberMe()" type="checkbox" id="remember" name="remember" value="1">
                  <span class="remember-word">{{txT.REMEMBER_ME}}</span>
                </div>
                <!-- <div>
                  <input @click="clickAdult()" type="checkbox" id="adult" name="adult" value="1">
                  <span class="adult-word">我已成年</span>
                </div> -->
                <div>
                  <!-- <input @click="clickAgree()" type="checkbox" id="agreement" name="agreement">
                  <span class="adult-word">我同意</span>
                  <a href="https://web.fbk168.com/rule.html" target="_blank" class="link-word">使用者條款</a> -->
                  <!-- <span class="link-word" @click="openRule()"> 使用者條款</span> -->
                </div>
            </div>

            <div class="form-group captcha-area">
                <div style="margin-top:5px;">
                    <div id="slider2"></div>
                </div>
            </div>  

            <div class="form-group">
              <div class="row">
                <div class="container text-center">
                  <button @click="freeToGo()" id="freeToGo" class="col-5 hidden" type="submit">{{txT.FREE_LOGIN}}</button>
                  <button @click="login()" id="login-button" class="col-5" type="submit">{{this.$root.$options['languageSet']['LOGIN_TXT']}}</button>
                </div>
              </div>
            </div>

            <div class="form-group">
                    <h4 id="forget-password" @click="forgetPassword()" class="text-center">{{txT.FORGETPW}}</h4>
            </div>

            <div class="copyright text-center">
              <div>
                <!-- &copy; <a class="webSiteFont hidden" href="https://www.ucoin.com.tw/" target="_blank">回饋寶{{this.$root.$options['languageSet']['OFFICIALWEB']}}</a> ALL RIGHTS RESERVED. -->
                <img src="@/assets/images/15+.jpg" alt="">
              </div>
              <p>Ver.{{returnVer()}}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/plugins/slideToUnlock/css/green.theme.css'
import '@/plugins/slideToUnlock/css/iphone.theme.css'
import '@/plugins/slideToUnlock/css/slideToUnlock.css'
import '@/plugins/slideToUnlock/js/slideToUnlock.js'
import { createCookie, accessCookie } from '@/assets/js/cookie.js'

export default {
  name: 'LoginForm',
  props: {
    url: String
  },
  components: {
  },
  data() {
   return {
     account: this.$store.state.userState['account'],
     password: '',
     rememberMe: false,
     adult: true,
     agree: true,
     lock: false,
     lang: '',
     langOb: {}
   }
  },
  methods: { 
    changeLan() {
      if(this.lang == 'jp'){
        localStorage.setItem('ULG_LANG', this.lang)
      } else {
        localStorage.setItem('ULG_LANG', this.lang)
      }
      location.reload()
    },
    freeToGo() {
      window.location = `${process.env.VUE_APP_DOMAIN_URL}${process.env.VUE_APP_FREE_TO_GO}`
      // window.location = 'http://localhost:8080/#/?Registration=true&auth=582158759f4de1d3cbd08a25546e4c980c945456486a225a90eca94aeb8f64a8992304840f700841775'
      this.$store.dispatch('freeToGo', true)
    },
    returnVer() {
      return process.env.VUE_APP_TAG_VER
    },
    clickRemeberMe() {
      this.rememberMe = !this.rememberMe
    },
    clickAdult() {
      this.adult = !this.adult
    },
    openRule() {
      this.$store.dispatch('userRuleModal', true)
    },
    api() {
        let data = {}
        data['url'] = this.$root.$options.api['api3']
        data['Authorization'] = localStorage.getItem('Authorization')
        data['identity'] = localStorage.getItem('identity')
        let res = this.$store.dispatch('getApi', data) 
        res.then((val)=>{
            if (val['result'] == 'error') {
                this.$store.dispatch('openAlert', val)
            } else {
                var data = val['data']
                this.$store.dispatch('updateMember', data)
                // if(!val['data']['phone'] || !val['data']['sms_verified_at']) {
                //     this.$router.push('/contractShop')
                //     return
                // } 
                if(!val['data']['phone'] || !val['data']['sms_verified_at']) {
                    // this.$route.push('/registrationRules')
                    this.$store.dispatch('regiSMS', true)
                    return
                } else {
                    if(this.$route.query.contractShop) {
                      this.$router.push({name: 'contractShop', params: { scPay: "true"}})
                    } else {
                      this.$router.push('mainPage')
                    }
                }
            }
        })    
    },
    clickAgree() {
      this.agree = !this.agree
    },
    login: function() {
      if(
        this.lock &&
        // this.adult &&
        this.agree
        ){
        if(this.rememberMe) {
          createCookie('account', this.account, 999);
        }
        let data = {}
        // data['data'] = this.$store.state.userState
        data['url'] = this.$root.$options.api['api24']
        data['account'] = this.account
        data['password'] = this.password
        data['Authorization'] = localStorage.getItem('Authorization')
        let res = this.$store.dispatch('postApi', data);
        res.then((val)=>{
          if (val['result'] == 'error') {
            this.$store.dispatch('openAlert', val)
          } else {
            let updateToken = {
              data: {
                access_token : localStorage.getItem('access_token'),
                identity_token : val.data.identity_token ? val.data.identity_token : localStorage.getItem('identity_token'),
                token_type: localStorage.getItem('token_type')
              }
            }
            this.$store.dispatch('updateToken', updateToken)
            this.api()
          }
        })
      } else {
        let error = {
            errorMsg: {
                error: {
                    message: ''
                }
            }
        }
        // if(!this.adult)
        // error.errorMsg.error.message = '我已成年必須勾選'
        if(!this.agree)
        error.errorMsg.error.message = '您必須同意以閱讀使用者手則'
        if(!this.lock)
        error.errorMsg.error.message = this.$root.$options['languageSet']['VERIFYNEED']
        
        this.$store.dispatch('openAlert', error)
      }
    }, 
    forgetPassword: function() {
        this.$store.dispatch('forgetPw', true)
    }
  },
  computed: {
    txT(){
        return this.$root.$options['languageSet']
    }
  },
  mounted() {
    this.txT
    $("#slider2").slideToUnlock({ 
        unlockfn: ()=>{
          this.lock = true
        },
        lockfn: ()=>{
          this.lock = false
        }
    });
    setTimeout(()=>{
      this.$store.dispatch('updateUserState', {account: accessCookie('account'), password: ''});
      this.account = accessCookie('account')
      window.scrollTo(0, 30)
    }, 1000)
  }
}
</script>