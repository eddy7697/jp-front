<template>
    <div class="inviTable">
        <div class="container">
            <div id="extraCol" class="row">
                <div class="col-6 text-left">
                </div>
                <div class="col-6 text-right">
                </div>
            </div>
            <div class="row" id="tableArea">
                <b-table class="table thead-dark" striped hover :items="expenses" :fields="fields">
                    <template slot="auth" slot-scope="data">
                        <button  @click="invit(data)" class="btn btn-primary">邀請QRcode</button>
                    </template>
                </b-table>  
            </div>
            <qrGroupCode :auth="auth" v-if="qrGroupCode" />
        </div>     
    </div>

</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import qrGroupCode from '@/components/group/qrGroupCode/qrGroupCode'
    export default {
        name: 'inviTable',
        components: {
            qrGroupCode
        },
        computed: {
            buyModal() {
            },
            authBuyModal() {
            },
            qrGroupCode() {
                return this.$store.state.modalControlOne.qrGroupCode
            }
        },
        methods: {
            invit(data) {
                this.auth = data['item']['auth']
                this.$store.dispatch('qrGroupCode', {show: true, content: ''})
            },
            openAuthBuy() {
                this.$store.dispatch('authBuyModal', true);
            },
            api() {
                let data = {}
                data['url'] = this.$root.$options.api['api3']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                let res = this.$store.dispatch('getApi', data) 
                res.then((val)=>{
                    if (val['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        console.log(val)
                    }
                })    
            },
            getBuff() {
                let data = {}
                data['url'] = this.$root.$options.api['api4']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.$store.dispatch('updateBuff', item)
                        this.items = item['data']['items']
                        if(this.items){
                            this.items.forEach((item)=>{
                                if(item['code'] == "referrer_tree_buff") {
                                    this.expenses.push(item['config'])
                                }
                            })
                        }
                    }
                })
                
            }
        },
        data() {
            return {
                expenses: [],
                fields: {
                    node_uid: {
                        label: '節點ID',
                        sortable: true
                    },
                    generate: {
                        label: '使用日期',
                        sortable: true
                    },
                    auth: {
                        label: 'QRCode',
                        sortable: true
                    }
                }
            }
        },
        mounted() {
            // let year = new Date().getFullYear()
            // let month = new Date().getMonth()+1
            // let data = {}
            // data['Authorization'] = localStorage.getItem('Authorization')
            // data['identity'] = localStorage.getItem('identity')
            // this.$store.dispatch('getApi', data).then((item)=>{
            //      if (item['result'] == 'error') {
            //         this.$store.dispatch('openAlert', val)
            //     } else {
            //         this.expenses = item['data']
            //         console.log('invi',this.expenses)
            //     }
            // })

            this.getBuff()
            // console.log('apin', this.expenses)
            this.api()
        }
    }
</script>