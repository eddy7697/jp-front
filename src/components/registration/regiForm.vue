<template>
    <div class="regiForm">
        <div class="container">
            <div class="row" v-if="invitor.account_name">
                <fieldset v-if="!freeToGo" class="form-group col-12 text-center">
                    <h5>您的邀請人帳號:{{invitor.account_name}}</h5>
                    <h5>推薦人ID: {{invitor.uid}}</h5>
                </fieldset>
            </div>
            <div class="row">
                <fieldset class="form-group col-12">
                    <label for="phone">手機號碼*</label>
                    <select v-model="country_codes"  class="form-control col-4" name="country_codes" id="country_codes">
                        <option value="">選擇國碼</option>
                        <option value="+886">{{this.$root.$options['languageSet']['TAIWAN']}}(+886)</option>
                        <option value="+86">{{this.$root.$options['languageSet']['CHINA']}}(+86)</option>
                        <option value="+1">{{this.$root.$options['languageSet']['USA']}}(+1)</option>
                        <option value="+60">{{this.$root.$options['languageSet']['MALAYSIA']}}(+60)</option>
                    </select>
                    <div class="input-group-append">
                        <input type="Number" v-model="phone" class="form-control col-12" name="phone" maxlength="20" placeholder="請輸入手機號碼">
                        <!-- <small class="text-danger col-12">最少9字元</small> -->
                    </div>
                    <b class="text-danger">電話為註冊帳號(最少十碼,需輸入0)</b>
                </fieldset>
            </div>
            <!-- <div class="row">
                <fieldset class="form-group col-12">
                    <label for="invitedPerson">帳號</label>
                    <input maxlength="12" v-model="invitedPerson" class="form-control" name="invitedPerson" id="invitedPerson" placeholder="請輸入帳號">
                </fieldset>
            </div> -->
            <div class="row">
                <fieldset class="form-group col-12">
                    <label for="password">密碼 *</label>
                    <input v-model="password" type="password"  class="form-control" name="password" id="password" placeholder="">
                    <small class="text-danger">最少6字元</small>
                </fieldset>
            </div>
            <!-- <div class="row">
                <fieldset class="form-group col-12">
                    <label for="confirmPassword">確認密碼 *</label>
                    <input v-model="confirmPassword" type="password"  class="form-control" name="confirmPassword" id="confirmPassword" placeholder="">
                    <small class="text-danger">最少6字元</small>
                </fieldset>
            </div> -->
            <div class="row" v-if="msgTxt">
                <fieldset class="form-group">
                    <div class="col-12">
                        <input type="text" v-model="msgNum" class="col-8 form-control" name="code" id="code" maxlength="20" required placeholder="簡訊驗證">
                        <button @click="toActivate()" class="btn btn-secondary btn-danger input-group-append" type="button" id="get_code">取得簡訊驗證碼</button>
                    </div>
                </fieldset>  
            </div>
            <!-- <div class="form-group captcha-area">
                <label id="captcha_text" for="captcha">驗證碼</label>
                <div style="margin-top:5px;">
                    <div id="slider2"></div>
                </div>
            </div> -->
        </div>
        <div class="container sure-area">
            <div class="row">
                <div class="col-6 text-center">
                    <button class="btn-lg btn-primary" @click="redirect('/')">{{txT['HOMEPAGE']}}</button>
                </div>
                <div class="col-6 text-center">
                    <button class="btn-lg btn-primary" :disabled="!msgTxt"  @click="sendRegiData()">{{this.$root.$options['languageSet']['CONFIRMTXT']}}</button>
                </div>
            </div>
        </div>
        <p class="hidden">{{computedForm}}</p>
    </div>
</template>
<script>

import redirect from './../../redirect'
const swal = require('sweetalert2')

    export default {
        name: 'regiForm',
        data() {
            return {
                invitedPerson: '',
                password: '',
                country_codes: '+886',
                phone: '',
                send: false,
                invitor: {},
                confirmPassword: '',
                msgTxt: false,
                msgNum: '',
            }
        },
        computed: {
            freeToGo() {
                return this.$store.state.login.freeToGo
            },
            auth() {
                // this.invitedPerson = `${this.phone}`
                return this.$store.state.buff.invitationQRAuth
            },
            computedForm() {
                console.log(this.country_codes)
                console.log(this.phone)
                console.log(this.password)
                if(
                    // this.invitedPerson &&
                    // this.country_codes &&
                    this.phone &&
                    this.country_codes &&
                    // this.confirmPassword &&
                    this.password
                ) {
                    this.msgTxt = true
                } else {
                    this.msgTxt = false
                }
            }
        },
        methods: {
            redirect(url) {
                this.$router.push(url)
            },
            getInvitor(itemAuth) {
                let data = {}
                data['url'] = `${this.$root.$options.api['api17']}${itemAuth}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        swal.fire({
                            title: 'Error!',
                            text: item.errorMsg,
                            type: 'error',
                            confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                        })
                        return
                    } else {
                        this.invitor = item['data']
                    }
                })
            },
            getP(queryString) {
                var query = {};
                var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
                return query;
            },
            toTrigger() {
                let data = {};
                data['url'] = this.$root.$options.api['api1'];
                data['client_id'] = '922301cb2254401cc84399578ec473de';
                data['client_secret'] = 'a7428d49d6d40dee87f43c4588154f0c';
                this.$store.dispatch('postApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        swal.fire({
                            title: 'Error!',
                            text: item.errorMsg,
                            type: 'error',
                            confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                        })
                        return
                        // this.$store.dispatch('openAlert', result)
                    } else {
                        this.$store.dispatch('updateToken', result)
                        this.getInvitor(this.auth)
                    }
                })
            },
            sendRegiData() {
                if(this.phone.length < 10) {
                    swal.fire({
                        title: 'Error!',
                        text: '請輸入九碼以上電話',
                        type: 'error',
                        confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                    })
                    return 
                }
                if(!this.auth) {
                    swal.fire({
                        title: 'Error!',
                        text: '錯誤，請重新掃描發財卡',
                        type: 'error',
                        confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                    })
                    return 
                }
                let data = {};
                data['url'] = this.$root.$options.api['api41']
                data['Authorization'] = localStorage.getItem('Authorization')
                // data['identity_token'] = localStorage.getItem('identity')
                data['auth'] = this.auth
                // data['account'] = this.invitedPerson
                data['account'] = `${this.phone}`
                data['password'] = this.password
                data['confirm_password'] = this.password
                data['number'] = this.msgNum
                data['phone'] = `${this.country_codes}${this.phone}`
                
                // ${this.country_codes}
                this.send = true
                this.$store.dispatch('postApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        localStorage.setItem('identity', `${result['data']['token_type']} ${result['data']['identity_token']}`)
                        // this.$store.dispatch('adsModal', true)
                        // this.$store.dispatch('regiSuccess', true)
                        redirect.redirect('/#/mainPage', '成功', this.$root.$options['languageSet']['REGISUCCESS'], 'success', true)

                        // localStorage.setItem('Authorization', `${result['token_type']} ${result['identity_token']}`)
                        // this.$router.push('registrationRules')
                        // this.$store.dispatch('regiSMS', true)
                        // this.$router.push('/registrationRules')

                    }
                })    
            },
            toActivate() {
                let data = {}
                data['url'] = this.$root.$options.api['api18']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                // ${this.country_codes}
                data['phone'] = `${this.country_codes}${this.phone}`
                console.log(data)
                let i = this.$store.dispatch('postApi', data);
                i.then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                    }
                })
            }
        },
        mounted() {
            this.auth
            this.toTrigger(this.auth)
        }
    }
</script>