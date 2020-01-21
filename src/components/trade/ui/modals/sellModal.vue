<template>
    <div class="sellModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
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
                                {{holdUcoin}}
                            </span>
                        </div>
                    </div>
                </div>
                <h4>拍賣回饋幣數量</h4>
                <div class="row input-area">
                    <input class="col-8" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="sellValue" type="number" id="buyingValue" value="" placeholder="單位最小為1"/>
                    <label class="col-4" >X100</label>
                </div>
                <h4 id="titleAuth" class="text-center">交易成交後您將扣除</h4>
                <div class="row">
                    <div class="col-2">
                        <img class="iconUcoin" src="~@/assets/images/modals/ucoin.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="ucoin-balance">-</span>
                        <span class="ucoin-balance-result">{{calUcoin}}</span>
                    </div>
                </div>
                <h4 id="titleAuth" class="text-center">交易成交後您將收到</h4>
                <div class="row">
                    <div class="col-2">
                        <img class="iconGold" src="~@/assets/images/modals/gold.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="gold-balance">+</span>
                        <span class="gold-balance-result">{{calGold}}</span>
                    </div>
                </div>
                <p class="text-center text-white">交易成功將收取2%手續費用</p>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                        <button class="cancelModal btn-lg text-center" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </button>
                    </div>
                    <div class="col-6 text-center">
                        <button class="confirmModal btn-lg text-center btn-primary" @click="sellCoin()">
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
        name: 'sellModal',
        data() {
            return {
                currency: '',
                quantity: '',
                sellValue: 1
            }
        },
        props: {
            item: ''
        },
        methods: {
            closeModal() {
                this.$store.dispatch('sellModal', false)
            },
            sellCoin() {
                let data = {};
                data['url'] = this.$root.$options.api['api33']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['serial'] = this.serial
                data['point'] = Number(this.sellValue*100)
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
        computed:{
            calUcoin() {
                if(this.sellValue > this.item['item']['point']/100) {
                    let error = {
                        errorMsg: {
                            error: {
                                message: `最大的交易金額${this.item['item']['point']}`
                            }
                        }
                    }
                    this.$store.dispatch('openAlert', error)
                    this.sellValue = 0
                }
                return Number(this.sellValue*100).toLocaleString()
            },
            calGold() {
                return Number(this.sellValue*this.$store.state.exchangeRate.sellRate*100).toLocaleString()
            },
            gold() {
                return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
            },
            holdUcoin() {
                return Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
            },
            serial() {
                return this.$store.state.exchangeRate.sellSerial
            }
        },
        mounted() {
            console.log('sellItem',this.item)
        }
    }
</script>