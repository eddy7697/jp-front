<template>
    <div class="sellTable">
        <div class="container">
            <div id="extraCol" class="row">
                <div class="col-6 text-left">
                    <button @click="toLoadData()">更新</button>
                </div>
                <div class="col-6 text-right">
                    <button v-if="true" @click="openAuthSell()">委託拍賣</button>
                </div>
            </div>
            <div class="row">
                <b-table class="table thead-dark" striped hover :items="income" :fields="fields">
                    <template slot="point" slot-scope="data">
                        <h6 class="text-success">
                            {{Number(data['item']['point']).toLocaleString()}}
                        </h6>
                    </template>
                    <template slot="amount" slot-scope="data">
                        <h6 class="text-primary">
                            {{Number(data['item']['amount']).toLocaleString()}}
                        </h6>
                    </template>
                    <template slot="uid" slot-scope="data">
                        <button  @click="openSellModal(data)" v-if="data.value !== uid " class="btn">賣出</button>
                        <button  @click="cancelSell(data)" v-if="data.value == uid " class="btn btn-default">{{this.$root.$options['languageSet']['CANCEL']}}</button>
                    </template>
                </b-table>
            </div>
            <div class="row btn-area-footer">
                <div class="container">
                    <div class="btn btn-sm col-6" @click="toLoadData('minus')">{{this.$root.$options['languageSet']['PREVIOUSPAGE']}}</div>
                    <div class="btn btn-sm col-6" @click="toLoadData('plus')" v-if="lastPage">{{this.$root.$options['languageSet']['NEXTPAGE']}}</div>
                </div>
            </div>
        </div>
        <sellModal :item="sellData" v-if="sellModal"/>
        <authSellModal v-if="authSellModal"/>
        <authBuyModal v-if="authBuyModal" /> 
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import sellModal from '@/components/trade/ui/modals/sellModal'
    import authSellModal from '@/components/trade/ui/modals/authSellModal'
    import authBuyModal from '@/components/trade/ui/modals/authBuyModal'
    import redirect from './../../../../../redirect'

    export default {
        name: 'sellTable',
        data() {
            return {
                income: null,
                fields: {
                    point: {
                        label: '回饋幣',
                        sortable: true
                    },
                    price: {
                        label: '單價',
                        sortable: true
                    },
                    amount: {
                        label: '金幣',
                        sortable: true
                    },
                    uid: {
                        label: '功能',
                        sortable: true
                    }
                },
                authShow: false,
                page: 1,
                lastPage: true,
                sellData: ''
            }
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid'];
            },
            sellModal() {
                if(!this.$store.state.modalControl.sellModal){
                    this.toLoadData()
                }
                return this.$store.state.modalControl.sellModal
            },
            authSellModal() {
                return this.$store.state.modalControl.authSellModal
            },
            checkBuff() {
            },
            authBuyModal() {
                return this.$store.state.modalControl.authBuyModal
            }
        },
        methods: {
            cancelSell(item) {
                let data = {};
                data['url'] = `${this.$root.$options.api['api33']}/${item['item'].serial}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                this.$store.dispatch('delApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            },
            openSellModal(item) {
                this.sellData = item
                this.$store.dispatch('sellRate', item['item'].price)
                this.$store.dispatch('sellModal', true)
                this.$store.dispatch('sellSerial', item['item'].serial)
            },
            openAuthSell() {
                this.$store.dispatch('authSellModal', true)
            },
            toLoadData(status) {
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }
                let year = new Date().getFullYear()
                let month = new Date().getMonth()+1
                let data = {}
                data['url'] = `${this.$root.$options.api['api33']}?page=${this.page}&rows=5`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        if(item['data'].length == 0){
                            this.lastPage = false;
                            this.income = [];
                        }else{
                             this.income = item['data']
                        }
                    }
                })
            },
            toCheckAuth(status) {
                let data = {}
                data['url'] = `${this.$root.$options.api['api35']}?page=1&rows=15`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        this.cards = item['data']['items']
                        this.cards.forEach((item)=>{
                            item['features'].forEach((obj)=>{
                                if(obj['code']== 'trade_expenses') {
                                } else {
                                }
                            })
                        })
                    }
                })
            }
        },
        components: {
            sellModal,
            authSellModal,
            authBuyModal
        },
        mounted() {
            this.toCheckAuth()
            this.toLoadData()
        }
    }
</script>