<template>
    <div class="buyTable">
        <div class="container">
            <div id="extraCol" class="row">
                <div class="col-6 text-left">
                    <button @click="toLoadData()">更新</button>
                </div>
                <div class="col-6 text-right">
                    <button v-if="true" @click="openAuthBuy()">委託收購</button>
                </div>
            </div>
            <div class="row">
                <b-table class="table thead-dark" striped hover :items="expenses" :fields="fields">
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
                    <button  @click="openBuyModal(data)" v-if="data.value !== uid " class="btn">購買</button>
                    <button  @click="cancelBuy(data)" v-if="data.value == uid " class="btn btn-default">{{this.$root.$options['languageSet']['CANCEL']}}</button>
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
       <buyModal :item="buyModalValue" v-if="buyModal"/>   
       <authBuyModal v-if="authBuyModal" /> 
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import buyModal from '@/components/trade/ui/modals/buyModal'
    import authBuyModal from '@/components/trade/ui/modals/authBuyModal'
    import redirect from './../../../../../redirect'

    export default {
        name: 'buyTable',
        components: {
            buyModal,
            authBuyModal
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            buyModal() {
                if(!this.$store.state.modalControl.buyModal){
                    this.toLoadData()
                }
                return this.$store.state.modalControl.buyModal
            },
            authBuyModal() {
                return this.$store.state.modalControl.authBuyModal
            }
        },
        methods: {
            cancelBuy(item) {
                let data = {};
                data['url'] = `${this.$root.$options.api['api30']}/${item['item'].serial}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                this.$store.dispatch('delApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        // let set = {};
                        // set['text'] = this.$root.$options['languageSet']['YOURALREADISUCCESS']
                        // set['title'] = '成功'
                        // set['url'] = 'contractShop'
                        // this.$store.dispatch('redirectConfirm', set)
                        redirect.redirect('/#/trade', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            },
            openBuyModal(item) {
                this.buyModalValue = item
                this.$store.dispatch('buySerial', item.item['serial'])
                this.$store.dispatch('buyRate', item.item['price'])
                this.$store.dispatch('buyModal', true)
            },
            openAuthBuy() {
                this.$store.dispatch('authBuyModal', true)
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
                data['url'] = `${this.$root.$options.api['api30']}?page=${this.page}&rows=5`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        if(item['data'].length == 0){
                            this.lastPage = false;
                            this.expenses = [];
                        }else{
                             this.expenses = item['data']
                        }
                    }
                })
            },
            toCheckAuth() {
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
                            if(item.id == 6){
                                this.authShow = true
                            }
                        })
                    }
                })
            }
        },
        data() {
            return {
                expenses: null,
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
                lastPage: true,
                page: 1,
                buyModalValue: ''
            }
        },
        mounted() {
            this.toLoadData()
            this.toCheckAuth()
        }
    }
</script>