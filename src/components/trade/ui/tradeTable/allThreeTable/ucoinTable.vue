<template>
    <div class="ucoinTable">
        <div class="container">
            <div id="extraCol" class="row">
                <div class="col-6 text-left">
                    <button>更新</button>
                </div>
            </div>
            <div class="row">
                <b-table class="table thead-dark" striped hover :items="ucoins" :fields="fields">
                    <template slot="point" slot-scope="data">
                        <h6 class="text-success">
                            {{Number(data['item']['point']).toLocaleString()}}
                        </h6>
                    </template>
                    <template slot="coin" slot-scope="data">
                        <button @click="withdraw(data)" v-if="data['item'].point > 0">
                            贖回
                        </button>
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
        <withdrawModal :item="withdrawItem" v-if="withdrawModal"/>       
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import withdrawModal from '@/components/trade/ui/modals/withdrawModal'
    export default {
        name: 'ucoinTable',
        components: {
            withdrawModal
        },
        data() {
            return {
                ucoins: null,
                fields: {
                    point: {
                        label: '數量',
                        sortable: true
                    },
                    created_at: {
                        label: '日期',
                        sortable: true
                    },
                    coin: {
                        label: '功能',
                        sortable: true
                    }
                },
                page: 1,
                lastPage: true,
                withdrawItem: ''
            }
        },
        computed: {
            withdrawModal() {
                return this.$store.state.modalControlOne.withdrawModal
            }
        },
        methods: {
            withdraw(item) {
                this.withdrawItem = item
                this.$store.dispatch('withdrawModal', true)
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
                data['url'] = `${this.$root.$options.api['api27']}?page=${this.page}&rows=5`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        if(item['data']['ucoin'].length == 0){
                            this.lastPage = false;
                            this.ucoins = [];
                        }else{
                            this.ucoins = item['data']['ucoin']
                        }
                    }
                })
            }
        },
        mounted() {
            this.toLoadData()
        }
    }
</script>