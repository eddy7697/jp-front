<template>
    <div class="withdrawModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <h4>購回專屬回饋幣量</h4>
                <div class="row input-area">
                    <div class="col-6">
                        <div class="goldCoin">
                            <span class="number">
                              {{gold}}
                            </span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="proC">
                            <span class="number">
                                {{proCoin}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row input-area">
                    <input onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="col-8" v-model="withdrawValue" type="number" id="authSellValue" value="" placeholder="單位最小為1"/>
                    <label class="col-4" ></label>
                </div>
                <div class="row">
                    <div class="col-2">
                        <img class="iconGold" src="~@/assets/images/modals/pro.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="pro-balance">-</span>
                        <span class="pro-balance-result">{{calPro}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <img class="iconGold" src="~@/assets/images/modals/gold.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="gold-balance">-</span>
                        <span class="gold-balance-result">{{calGold}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <img class="iconUcoin" src="~@/assets/images/modals/ucoin.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="ucoin-balance">+</span>
                        <span class="ucoin-balance-result">{{calUcoin}}</span>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                        <button class="cancelModal btn-lg text-center" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </button>
                    </div>
                    <div class="col-6 text-center">
                        <button class="confirmModal btn-lg text-center btn-primary" @click="sendWithdraw()">
                            {{this.$root.$options['languageSet']['CONFIRMTXT']}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import redirect from './../../../../redirect'
    export default {
        name: 'withdrawModal',
        data() {
            return {
                currency: '',
                quantity: '',
                withdrawValue: 1,
                authBuyPrice: null,
                apiId: '',
            }
        },
        props: {
            item: ''
        },
        methods: {
            onlyForCurrency($event) {
                if(this.authBuyPrice!=null && this.authBuyPrice.indexOf(".")>-1 && (this.authBuyPrice.split('.')[1].length > 1)){
                    $event.preventDefault();
                }
            },
            closeModal() {
                this.$store.dispatch('withdrawModal', false)
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
                            console.log(obj)
                            if(obj['features'][0]['code'] == 'trade_income') {
                                this.apiId = obj.id
                            }
                        })
                        console.log(this.apiId)
                    }
                })
            },
            sendWithdraw() {
                let data = {};
                data['url'] = this.$root.$options.api['api27']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['serial'] = this.item['item']['serial']
                data['point'] = this.withdrawValue
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            }
        },
        components: {
        },
        computed:{
            calPro() {
                return Number(this.withdrawValue).toLocaleString()
            },
            proCoin() {
                return Number(this.item['item']['point']).toLocaleString()
            },
            calUcoin() {
                return Number(this.withdrawValue).toLocaleString()
            },
            calGold() {
                return Number(this.withdrawValue).toLocaleString()
            },
            gold() {
                this.quantity = Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
                return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
            }
        },
        mounted() {
            this.getBackPack()
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
                    }
                }
            }) 
        }
    }
</script>