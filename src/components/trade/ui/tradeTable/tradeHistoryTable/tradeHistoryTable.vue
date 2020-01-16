<template>
    <div class="tradeHistoryTable">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-table class="table thead-dark" striped hover :items="items" :fields="fields">
                        <template slot="price" slot-scope="data">
                            <h6 class="text-success">
                                {{Number(data['item']['price']).toLocaleString()}}
                            </h6>
                        </template>
                        <template slot="amount" slot-scope="data">
                            <h6 class="text-primary">
                                {{Number(data['item']['amount']).toLocaleString()}}
                            </h6>
                        </template>
                    </b-table>
                </div>
            </div>
            <div class="row btn-area-footer">
                <div class="container">
                    <div class="btn btn-sm col-6" @click="toLoadData('minus')">{{this.$root.$options['languageSet']['PREVIOUSPAGE']}}</div>
                    <div class="btn btn-sm col-6" @click="toLoadData('plus')" v-if="lastPage">{{this.$root.$options['languageSet']['NEXTPAGE']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'tradeHistoryTable',
        data() {
            return {
                items: null,
                fields: {
                    amount: {
                        label: '數量',
                        sortable: true
                    },
                    price: {
                        label: '單價',
                        sortable: true
                    },
                    created_at: {
                        label: '建立時間',
                        sortable: true
                    },
                    content: {
                        label: '狀態',
                        sortable: true
                    }
                },
                lastPage: true, 
                page: 1
            }
        },
        methods: {
            toLoadData(status) {
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }
                let data = {}
                data['url'] = `${this.$root.$options.api['api28']}?page=${this.page}&rows=5`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        if(item['data'].length == 0){
                            this.lastPage = false
                            this.items = []
                        }else{
                            this.items = item['data']
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