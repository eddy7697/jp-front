<template>
    <div class="scPay">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <h4>交易</h4>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <ul>
                            <li>
                                支付對方帳號: {{name}}
                            </li>
                        </ul>
                    </div>
                    <div class="col-12">
                        <h5 id="waistTitle" class="text-center">請輸入交易金額</h5>
                        <div class="form-group row">
                            <label for="number" class="col-sm-2 col-form-label">新台幣(NT)</label>
                            <div class="col-sm-10">
                            <input type="number" class="form-control" id="number" v-model="cash" placeholder="請輸入現金" 
                                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                title="Numbers only"
                            >
                            </div>
                        </div>
                        <h5 id="waistTitle" class="text-center" style="margin-top: 30px;">請輸入禮券折抵金額</h5>
                        <div class="form-group row">
                            <label for="coupon" class="col-sm-2 col-form-label">新台幣(NT)</label>
                            <div class="col-sm-10">
                            <input type="number" v-model="coupon" class="form-control" id="coupon" placeholder="請輸入現金"
                                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                title="Numbers only"
                            >
                            <small id="emailHelp" class="form-text text-danger">您的禮券餘額{{userBalanceGift}}，最高折抵{{userGiftOwn}}新台幣(NT)</small>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">換算禮券分數:</label>
                            <div class="col-sm-10">
                            <input class="form-control" id="greenGift" v-model="greenGift" readonly placeholder="請輸入現金">
                            </div>
                        </div>
                        <div v-if="needPw" class="form-group row">
                            <label class="col-sm-2 col-form-label">請輸入密碼:</label>
                            <div class="col-sm-10">
                            <input class="form-control" type="password" id="greenGift" v-model="password" placeholder="請輸入密碼">
                            <small class="text-danger text-left">註：超過20萬分禮券需輸入密碼</small>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 text-right">
                                <span>實際付款金額</span>
                            </div>
                            <div class="col-6 text-left text-danger">
                                <span>{{total}} 新台幣(NT)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button class="btn btn-lg btn-primary" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </button>
                        <button class="btn btn-lg btn-success" @click="scModalConfirm()">
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

export default {
    name: 'scPay',
    data(){
        return {
            coupon: 0,
            cash: 0,
            resultPoint: 0,
            password: '',
            needPw: false
        }
    },
    computed: {
        uid(){
            return this.$store.state.modalControl.scModalContent.uid
        },
        greenGift(){
            return Number(this.coupon * 200).toLocaleString()
        },
        total() {
            return Number(this.cash - this.coupon).toLocaleString()
        },
        name() {
            return this.$store.state.modalControl.scModalContent.name
        }, 
        userGiftOwn() {
            if(this.cash <= Math.floor(this.$store.state.memberInfo.userInfo.gift/200) && this.cash > 2 && this.cash > -1) {
                return  Math.floor(this.cash-1)
            }
            return Math.floor(this.$store.state.memberInfo.userInfo.gift/200)
        },
        userBalanceGift() {
            console.log(Number(this.userGiftOwn))
            console.log(Number(this.coupon))
            if(Number(this.coupon) >= Number(this.userGiftOwn)) {
                this.coupon = this.userGiftOwn
            }
            if((this.coupon * 200) >= 200000) {
                this.needPw = true
            } else {
                this.needPw = false
            }
            return Math.floor(this.$store.state.memberInfo.userInfo.gift).toLocaleString()
        }
    },
    methods:{
        closeModal() {
            this.$store.dispatch('scModal', {show: false, content: ''})
            this.$store.dispatch('openItem', false)
        },
        scModalConfirm() {
            let data = {};
            data['url'] = this.$root.$options.api['api11']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity_token'] = localStorage.getItem('identity')
            data['to_member_uid'] = Number(this.$store.state.modalControl.scModalContent.uid)
            data['amount'] = Number(this.cash)
            data['point'] = Number(this.coupon * 200)
            data['password'] = this.password
            console.log(data)
            
            this.$store.dispatch('postApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    this.$store.dispatch('openAlert', result)
                } else {
                    this.$store.dispatch('scModal', {show: false, content: ''})
                    let modalData = {}
                    modalData['openItem'] = false
                    modalData['item'] = {}
                    this.$store.dispatch('openItem', modalData)
                    let set = {};
                    set['text'] = ''
                    set['title'] = '成功'
                    set['url'] = 'contractShop'
                    this.closeModal()
                    this.$store.dispatch('redirectConfirm', set)
                    this.$store.dispatch('subNavNu', 3)
                }
            })   
        }
    },
    mounted() {
    }
}
</script>
