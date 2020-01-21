<template>
    <div class="regiSMS">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row text-primary col-12">
                   <h4 class="text-center text-danger col-12">手機驗證</h4>
                   <h4 class="text-center col-12">註冊帳號：{{account}}</h4>
                </div>
            </div>
            <div class="container">
                <div class="row col-12">
                    <label for="phone">手機號碼*</label>
                    <select v-model="country_codes"  class="form-control" name="country_codes" id="country_codes">
                        <option value="+886">{{this.$root.$options['languageSet']['TAIWAN']}}(+886)</option>
                        <option value="+86">{{this.$root.$options['languageSet']['CHINA']}}(+86)</option>
                        <option value="+1">{{this.$root.$options['languageSet']['USA']}}(+1)</option>
                        <option value="+60">{{this.$root.$options['languageSet']['MALAYSIA']}}(+60)</option>
                    </select>
                </div>
                <div class="row col-12">
                    <input type="text" v-model="mobile" class="form-control" name="phone" maxlength="20" placeholder="請輸入手機號碼，以取得簡訊驗證碼">
                    <smell class="text-danger">例: 911222333 (不帶0)</smell>
                </div>
                <div class="row">
                    <div class="input-group col-12">
                        <input type="text" v-model="msgTxt" class="form-control" name="code" id="code" maxlength="20" required placeholder="簡訊驗證碼">
                        <div class="input-group-append">
                            <button class="btn btn-secondary btn-danger" type="button" id="get_code" @click="getMsgTxt()">取得驗證碼</button>
                        </div>
                    </div>
                </div>
                <div class="row text-primary" id="recommandLine" v-if="inviteLineId">
                    <div class="text-left">
                        <div>
                            <p>您的邀請人LINE: <span class="text-success">{{inviteLineId}}</span></p>
                            <p>功能說明可聯繫您的邀請人</p>
                            <p>或登入後聯絡客服</p>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div @click="closeModal()" class="col-6 text-center btn-lg btn-default">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </div>
                        <div @click="sendData()" class="col-6 text-center btn-lg btn-primary">
                            確認
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import redirect from './../../../redirect'

    export default {
        name: 'regiSMS',
        data(){
            return {
                country_codes: '+886',
                msgTxt: '',
                mobile: '',
                account: '',
                inviteLineId: ''
            }
        },
        computed: {
            phone() {
            }
        },
        methods: {
            closeModal() {
                this.$store.dispatch('regiSMS', false)
            },
            getMsgTxt() {
                let data = {}
                data['url'] = this.$root.$options.api['api45']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['phone'] = `${this.country_codes}${this.mobile}`
                console.log(data)
                let i = this.$store.dispatch('postApi', data);
                i.then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        var data = result['data']
                        console.log(data)
                    }
                })
            },
            getMe() {
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
                        // this.mobile = this.$store.state.memberInfo.userInfo.phone
                        this.account = this.$store.state.memberInfo.userInfo.account_name
                        this.inviteLineId = this.$store.state.memberInfo.userInfo.recommender_line_id
                    }
                })    
            },
            sendData() {
                let data = {};
                data['url'] = this.$root.$options.api['api46']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['number'] = this.msgTxt
                data['phone'] = `${this.country_codes}${this.mobile}`

                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/contractShop', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            }
        },
        mounted() {
            this.getMe()
        }
    }
</script>