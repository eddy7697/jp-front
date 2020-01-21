<template>
    <div class="buyModal">
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
                <h4>購買回饋幣數量</h4>
                <div class="row input-area">
                    <input class="col-8" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="buyValue" type="number" id="buyingValue" value="" placeholder="單位最小為1"/>
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
                <h4 id="titleAuth" class="text-center">交易成交後您將扣除</h4>
                <div class="row">
                    <div class="col-2">
                        <img class="iconGold" src="~@/assets/images/modals/gold.png" alt="">
                    </div>
                    <div class="col-10">
                        <span class="gold-balance">-</span>
                        <span class="gold-balance-result">{{calGold}}</span>
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
                        <button class="confirmModal btn-lg text-center btn-primary" @click="buyCoin()">
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
        name: 'buyModal',
        data() {
            return {
                currency: '',
                quantity: '',
                buyValue: 1
            }
        },
        props: {
            item: ''
        },
        methods: {
            closeModal() {
                this.$store.dispatch('buyModal', false)
            },
            buyCoin() {
                let data = {};
                data['url'] = this.$root.$options.api['api30']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['serial'] = this.serial
                data['point'] = Number(this.buyValue*100)
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)

                        // let set = {};
                        // set['text'] = this.$root.$options['languageSet']['YOURALREADISUCCESS']
                        // set['title'] = '成功'
                        // set['url'] = 'trade'
                        // this.$store.dispatch('redirectConfirm', set).then(result => {
                        //     this.$router.go(set['url'])
                        //     this.closeModal()
                        //     this.getData()
                        //     // this.$router.go('-1')
                        // })
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
                            this.quantity = item['data'][0]['point']
                        }
                    }
                }) 
            }
        },
        computed:{
            gold() {
                if(this.buyValue > this.item['item']['point']/100) {
                    let error = {
                        errorMsg: {
                            error: {
                                message: `最大的交易金額${this.item['item']['point']}`
                            }
                        }
                    }
                    this.$store.dispatch('openAlert', error)
                    this.buyValue = 0
                }
                return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
            },
            calUcoin() {
                return Number(this.buyValue*100).toLocaleString()
            },
            calGold() {
                return Number(this.buyValue*this.$store.state.exchangeRate.buyRate*100).toLocaleString()
            },
            holdUcoin() {
                return Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
            },
            serial() {
                return this.$store.state.exchangeRate.buySerial
            }
        },
        mounted() {
            
        }
    }
</script>