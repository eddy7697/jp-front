<template>
    <div class="redEnvModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h4 class="col-12 text-center">使用紅包卡</h4>
                        <div class="row">
                            <div class="col-12 text-center">
                                <div class="goldCoin">
                                    <span class="number">
                                    {{gold}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row input-area">
                            <label class="col-12 text-center" >紅包分數*</label>
                            <vue-numeric class="col-12" separator="," v-model="redResult"></vue-numeric>
                        </div>
                        <div class="row input-area">
                            <label class="col-12 text-center" >收取方ID*(非帳號)</label>
                            <small class="col-12 text-center text-white">ID於點選[帳戶]或[頭像]</small>
                            <input class="col-12" v-model="redAccount" type="text" id="authSellValue" value="" placeholder=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <div class="row">
                            <div class="input-group col-12">
                                <input type="text" v-model="msgTxt" class="form-control" name="code" id="code" maxlength="20" required placeholder="簡訊驗證碼">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary btn-success" type="button" id="get_code" @click="getMsgTxt()">取得簡訊驗證碼</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                        <div class="btn btn-lg btn-default" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </div>
                    </div>
                    <div class="col-6 text-center">
                        <div class="btn btn-lg btn-primary" @click="sendData()">
                            確認
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueNumeric from 'vue-numeric'
import redirect from './../../../redirect'

export default {
    name: 'redEnvModal',
    data(){
        return {
            currency: '',
            redAccount: '',
            redResult: '',
            apiId: '',
            msgTxt: ''
        }
    },
    components: {
        VueNumeric     
    },
    methods:{
        getMsgTxt() {
            let data = {}
            data['url'] = this.$root.$options.api['api26']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity_token'] = localStorage.getItem('identity')
            // data['phone'] = this.mobile
            data['type'] = 'gold'
            console.log(data)
            let i = this.$store.dispatch('postApi', data);
            i.then((result)=>{
                if (result['result'] == 'error') {
                    this.$store.dispatch('openAlert', result)
                } else {
                    // var data = result['data']
                    // console.log(data)
                }
            })
        },
        getBackPack() {
            let data = {}
            data['url'] = `${this.$root.$options.api['api35']}?page=1&rows=15`
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', val)
                } else {
                    item['data']['items'].forEach((obj)=> {
                        if(obj['features'][0]['code'] == 'transfer_gold') {
                            this.apiId = obj.id
                        }
                    })
                    console.log(this.apiId)
                }
            })
        },
        closeModal() {
            this.$store.dispatch('redEnvModal', false)
        },
        getCoinInfo() {
            let data = {}
            data['url'] = this.$root.$options.api['api34']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', item)
                } else {
                    if(item['data'].length > 0) {
                        this.currency = item['data'][0]['currency']
                        // this.quantity = Number(item['data'][0]['point']).toLocaleString()
                    }
                }
            }) 
        },
        sendData() {
            {
                let data = {};
                data['url'] = `${this.$root.$options.api['api37']}${this.apiId}/use`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['features[0][code]'] = 'transfer_gold'
                data['features[0][handle][quantity]'] = this.redResult
                data['features[0][handle][uid]'] = this.redAccount
                data['features[0][handle][number]'] = this.msgTxt
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        // let set = {};
                        // set['text'] = this.$root.$options['languageSet']['YOURALREADISUCCESS']
                        // set['title'] = '成功'
                        // set['url'] = 'trade'
                        this.closeModal()
                        redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)

                        // this.$store.dispatch('redirectConfirm', set).then(result => {
                        //     this.$router.go(set['url'])
                        // })
                    }
                })
            }
        }
    },
    computed:{
        gold() {
            return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
        },
        content() {
            return this.$store.state.modalControl.cardModalContent
        },
        uid() {
            return this.$store.state.memberInfo.userInfo['uid'];
        },
        mobile() {
            return this.$store.state.memberInfo.userInfo['phone'];
        }
    },
    mounted() {
        console.log(this.mobile)
        this.getCoinInfo()
        this.getBackPack()
    }
}
</script>
