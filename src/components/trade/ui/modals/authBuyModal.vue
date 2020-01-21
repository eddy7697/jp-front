<template>
    <div class="authBuyModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <h4>委託收購回饋幣</h4>
                <div class="row input-area">
                    <div class="col-6">
                        <div class="goldCoin">
                            <span class="number">
                              {{gold}}
                            </span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="uCoin">
                            <span class="number">
                                {{quantity}}
                            </span>
                            
                        </div>
                    </div>
                </div>
                <div class="row input-area">
                    <input @keypress="onlyForCurrency" class="col-8" v-model="authBuyPrice" type="number" id="authSellValue" value="" placeholder="小數後兩位">
                    <label class="col-4" >出價</label>
                </div>
                <div class="row input-area">
                    <input onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="col-8" v-model="authBuyValue" type="number" id="authSellValue" value="" placeholder="單位最小為1"/>
                    <label class="col-4" >X100</label>
                </div>
                <h4 id="titleAuth" class="text-center">交易成交後您將收到</h4>
                <div class="row">
                    <div class="col-2">
                        <img class="iconUcoin" src="~@/assets/images/modals/ucoin.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="ucoin-balance">+</span>
                        <span class="ucoin-balance-result">{{calUcoin}}</span>
                    </div>
                </div>
                <h4 id="titleAuth" class="text-center">交易上架後您將扣除</h4>
                <div class="row">
                    <div class="col-2">
                        <img class="iconGold" src="~@/assets/images/modals/gold.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="gold-balance">-</span>
                        <span class="gold-balance-result">{{calGold}}</span>
                    </div>
                </div>
                <h5 class="text-center text-white">*成功上架後7日到期，系統自動下架</h5>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                        <button class="cancelModal btn-lg text-center" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </button>
                    </div>
                    <div class="col-6 text-center">
                        <button class="confirmModal btn-lg text-center btn-primary" @click="authBuyCoin()">
                            {{this.$root.$options['languageSet']['CONFIRMTXT']}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const swal = require('sweetalert2')
    import redirect from './../../../../redirect'

    export default {
        name: 'authBuyModal',
        data() {
            return {
                currency: '',
                quantity: '',
                authBuyValue: 1,
                authBuyPrice: null,
                apiId: '',
            }
        },
        methods: {
            onlyForCurrency($event) {
                console.log(this.compareResult)
                if(this.authBuyPrice!=null && this.authBuyPrice.indexOf(".")>-1 && (this.authBuyPrice.split('.')[1].length > 1)){
                    $event.preventDefault();
                }
            },
            closeModal() {
                this.$store.dispatch('authBuyModal', false)
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
                            if(obj['features'][0]['code'] == 'trade_income') {
                                this.apiId = obj.id
                            } 
                        })
                    }
                })
            },
            authBuyCoin() {
                if(!this.apiId) {
                    swal.fire({
                        title: 'Error!',
                        text: '您未擁有拍賣卡',
                        type: 'error',
                        confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                    })
                    return
                }
                let data = {};
                data['url'] = `${this.$root.$options.api['api37']}${this.apiId}/use`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['features[0][code]'] = 'trade_income'
                data['features[0][handle][point]'] = Number(this.authBuyValue*100)
                data['features[0][handle][price]'] = Number(this.authBuyPrice)
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            },
            getData() {
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
        },
        components: {
        },
        computed:{
            compareResult() {
                return this.$store.state.memberInfo.userInfo.gold
            },
            calUcoin() {
                return Number(this.authBuyValue*100).toLocaleString()
            },
            calGold() {
                if(this.authBuyValue > this.compareResult) {
                    swal.fire({
                        title: 'Error!',
                        text: '您已超出您擁有的金幣',
                        type: 'error',
                        confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                    }).then(function(){
                        this.authBuyValue = 0
                    })
                }
                return Number(this.authBuyValue*this.authBuyPrice*100).toLocaleString()
            },
            gold() {
                this.quantity = Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
                return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
            }
        },
        mounted() {
            this.getBackPack()
            
        }
    }
</script>