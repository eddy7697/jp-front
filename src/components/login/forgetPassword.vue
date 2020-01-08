<template>
    <div class="forgetPassword">
        <div class="row">
      <div class="container">
        <div class="login-form">   
            <h3 class="text-center">忘記密碼</h3>   
            <p class="text-center">確認送出後，您將收到新密碼簡訊，請用新密碼登入並盡快重設密碼</p>  
            <div class="form-group text-left">
                <label for="username">帳號</label>
                <input v-model="account" type="text" placeholder="" name="account" id="account" required>
            </div>

            <div class="form-group mobile-area text-left">
              <label style="padding:0px;" class="col-2" for="mobile text-left">手機號碼</label>
              <select v-model="country_codes" name="country_codes" id="country_codes" class="col-2">
                <option value="+886">台灣(+886)</option>
                <option value="+86">中國區(+86)</option>
                <option value="+1">美國區(+1)</option>
                <option value="+60">馬來西亞區(+60)</option>
              </select>
              <input class="col-8" v-model="mobile" type="mobile" placeholder="" name="mobile" id="mobile" required>
            </div>  

            <div class="form-group">
              <button @click="forgetPw()" id="login-button" type="submit">送出</button>
            </div>

            <div class="form-group">
              <h4 id="forget-password" @click="prev()" class="text-center">上一步</h4>
            </div>

            <div class="copyright text-center">
              <div>
                <!-- &copy; <a class="webSiteFont" href="https://www.ucoin.com.tw/" target="_blank">回饋寶官網</a> ALL RIGHTS RESERVED. -->
                <img src="@/assets/images/15+.jpg" alt="">
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
    import redirect from './../../redirect'
    export default {
        name: 'forgetPassword',
        data() {
          return {
            account: '',
            mobile: '',
            country_codes: '+886'
          }
        },
        methods: {
          forgetPw() {
              let data = {};
              data['url'] = this.$root.$options.api['api23']
              data['Authorization'] = localStorage.getItem('Authorization')
              data['identity_token'] = localStorage.getItem('identity')
              data['phone'] = this.country_codes+this.mobile
              data['account'] = this.account
              this.$store.dispatch('postApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    this.$store.dispatch('openAlert', result)
                } else {
                    redirect.redirect('/#/', '成功', '您已成功', 'success', true)
                }
              })
          },
          prev() {
              this.$store.dispatch('forgetPw', false)
          }
        }
    }
</script>