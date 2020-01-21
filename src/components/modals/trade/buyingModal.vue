<template>
    <div class="buyingModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <h4>購買回饋幣數量(公司)</h4>
                <div class="row">
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
                    <input class="col-8" v-model="buyingValue" type="number" id="buyingValue" placeholder="單位最小為1"/>
                    <label class="col-4" >X100</label>
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
                        <button class="confirmModal btn-lg text-center btn-primary" @click="buyingCoin()">
                            {{this.$root.$options['languageSet']['CONFIRMTXT']}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import redirect from './../../../redirect'
const swal = require('sweetalert2')

export default {
    name: 'buyingModal',
    data() {
        return {
            currency: '',
            // quantity: '',
            buyingValue: 1
        }
    },
    methods:{
        closeModal() {
            this.$store.dispatch('buyingModal', false)
        },
        buyingCoin() {
            let data = {};
            data['url'] = this.$root.$options.api['api34']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity_token'] = localStorage.getItem('identity')
            data['currency'] = this.currency;
            data['point'] = this.buyingValue*100;

            this.$store.dispatch('putApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    console.log(result)
                    this.$store.dispatch('openAlert', result)
                } else {
                    // let set = {};
                    // set['text'] = '您已成功購買'
                    // set['title'] = '成功'
                    // set['url'] = 'trade'
                    // this.$store.dispatch('redirectConfirm', set).then(result => {
                    //     this.$router.go(set['url'])
                    // })
                    redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                }
            })
        }
    },
    computed:{
        gold() {
            // console.log('1', Math.floor(this.buyingValue))

            // console.log('2', Math.floor(this.$store.state.memberInfo.userInfo.gold/this.currency))
            if(Math.floor(this.buyingValue*100) > (this.$store.state.memberInfo.userInfo.gold/this.currency)) {
                swal.fire({
                    title: 'Error!',
                    text: '您超過了',
                    type: 'error',
                    confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                })
                this.buyingValue = 0
            }
            return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
        },
        calUcoin() {
            return Number(this.buyingValue*100).toLocaleString()
        },
        calGold() {
            return Number(this.currency*this.buyingValue*100).toLocaleString()
        },
        quantity() {
            console.log(this.$store.state.memberInfo.userInfo)
            return Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
        }
    },
    mounted() {
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
    }
}
</script>
