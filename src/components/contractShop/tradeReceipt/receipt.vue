<template>
    <div class="tradeReceipt">
        <div class="content">
        <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
        <h4>交易明細</h4>
        <div class="container">
                <div class="row">
                    <div class="col-12" id="scFirstCol">
                        <ul>
                            <li>
                                交易編號: {{this.content['item'].number}}
                            </li>
                            <li>
                                消費帳號: {{this.content['item'].from_member_account}}
                            </li>
                            <li>
                                店家帳號: {{this.content['item'].to_member_account}}
                            </li>
                        </ul>
                    </div>
                    <div class="col-12">
                        <div class="detail">
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="text-primary">
                                        消費者
                                    </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-left">交易金額(台幣)</div>
                                <div class="col-6 text-right">{{totalAmount}}</div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-left">折抵金額(台幣)</div>
                                <div class="col-6 text-right">-{{amount}}</div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-left">實付金額(台幣)</div>
                                <div class="col-6 text-right text-danger">{{finalAmount}}</div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="text-primary">
                                        店家 {{this.content['item'].to_contract_store_name}}
                                    </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-left">實收分數</div>
                                <div class="col-6 text-right text-danger">{{point}}點</div>
                            </div>
                            <div class="row">
                                <div class="col-6 text-left">預扣分數</div>
                                <div class="col-6 text-right text-danger">{{preCount}}點</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center" v-if="content.item['confirm_status'] == 0 && content.item['from_member_account_uid'] !== uid">
                        <button class="btn btn-lg btn-success col-6" @click="confirm()">
                            {{this.$root.$options['languageSet']['CONFIRMTXT']}}
                        </button>
                         <button class="btn btn-lg btn-danger col-6" @click="reject()">
                            拒絕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const swal = require('sweetalert2')
    import redirect from './../../../redirect'

    export default {
        name: 'tradeReceipt',
        methods: {
            closeModal () {
                this.$store.dispatch('tradeReceipt', {show: false, content: ''})
            },
            confirm() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api9']}${this.content['item'].number}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        redirect.redirect('/#/contractShop', '失敗', result.errorMsg.error.message, 'error', true)
                    } else {
                        redirect.redirect('/#/contractShop', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            },
            reject() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api10']}${this.content['item'].number}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        redirect.redirect('/#/contractShop', '失敗', result.errorMsg.error.message, 'error', true)
                    } else {
                        redirect.redirect('/#/contractShop', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            }
        },
        computed: {
            content() {
                return this.$store.state.contractShop.tradeReceiptContent
            },
            amount() {
                return Number(this.content['item'].discount_amount).toLocaleString()
            },
            point() {
                return Number(this.content['item'].discount_point).toLocaleString()
            },
            totalAmount() {
                return Number(this.content['item'].total_amount).toLocaleString()
            },
            finalAmount() {
                return Number(this.content['item'].final_amount).toLocaleString()
            },
            preCount() {
                return Number(this.content['item']['to_member_hold_point']).toLocaleString()
            },
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            }
        },
        mounted() {
            console.log(this.content)
        }
    }
</script>