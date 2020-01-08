<template>
    <div class="goldCoinTable">
        <div class="bg-white container">
            <label for="intervalFilter">區間搜尋:</label>
            <select v-model="interval" @change="toLoadTableData('reset')" class="form-control col-5" name="" id="intervalFilter">
                <option value="today">本日</option>
                <option value="yesterday">昨日</option>
                <option value="current_week">本週</option>
                <option value="previous_week">上週</option>
                <option value="thisMonth">本月</option>
                <option value="lastMonth">上月</option>
            </select>
        </div>
        <div class="container">
            <div class="row">
                <b-table class="table thead-dark" striped hover :items="items" :fields="fields">
                    <template slot="type" slot-scope="data">
                        <h6 class="text-success" v-if="data['item']['type'] == 'gift'">禮券</h6>
                        <h6 class="text-warning" v-if="data['item']['type'] == 'gold'">金幣</h6>
                        <h6 class="text-primary" v-if="data['item']['type'] == 'ucoin'">回饋幣</h6>
                        <h6 class="text-danger" v-if="data['item']['type'] == 'bonus'">紅利</h6>
                    </template>
                    <template slot="operate" slot-scope="data">
                        <h6 class="text-success" v-if="data['item']['operate'] == 'expenses'">
                            轉出
                        </h6>
                        <h6 class="text-info" v-if="data['item']['operate'] == 'income'">
                            轉入
                        </h6>
                    </template>
                    <template slot="point" slot-scope="data">
                        <h6 class="text-info" v-if="data['item']['operate'] == 'income'">
                            {{Number(data['item']['point']).toLocaleString()}}
                        </h6>
                         <h6 class="text-success" v-if="data['item']['operate'] == 'expenses'">
                            {{Number(data['item']['point']).toLocaleString()}}
                        </h6>
                    </template>
                    <template slot="balance" slot-scope="data">
                        <h6 class="text-info">
                            {{Number(data['item']['balance']).toLocaleString()}}
                        </h6>
                    </template>
                </b-table>       
            </div>
            <div class="row btn-area-footer">
                <div class="container">
                    <div class="btn btn-sm col-6" @click="toLoadTableData('minus')">上一頁</div>
                    <div class="btn btn-sm col-6" @click="toLoadTableData('plus')" v-if="lastPage">下一頁</div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'goldCoinTable',
        data() {
            return {
                items: null,
                interval: 'thisMonth',
                fields: {
                    type: {
                        label: '幣別',
                        sortable: true
                    },
                    operate: {
                        label: '進出',
                        sortable: true
                    },
                    point: {
                        label: '分數',
                        sortable: true
                    },
                    balance: {
                        label: '餘額',
                        sortable: true
                    },
                    content: {
                        label: '類型',
                        sortable: true
                    },
                    project: {
                        label: '說明',
                        sortable: true
                    },
                    created_at: {
                        label: '時間',
                        sortable: true
                    },
                },
                lastPage: true,
                page: 1,
                type: ''
            }
        },
        props: {
            // items: Array
        },
        components: {},
        methods: {
            toLoadTableData(status, type) {
                // console.log(type)
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }
                if(status == 'reset'){
                    this.page = 1
                }

                let year = new Date().getFullYear()
                var month = new Date().getMonth()+1
                if(this.interval == 'lastMonth'){
                    month = new Date().getMonth()
                } 
                let data = {}
                data['url'] = `${this.$root.$options.api['api5']}${year}/${month}?page=${this.page}&interval=${this.interval}&rows=15&type=gold`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data'].length == 0){
                            // this.lastPage = false;
                            this.items = [];
                        }else{
                             this.items = item['data']
                        }
                    }
                })
            }
        },
        mounted() {
            this.toLoadTableData()
        }
    }
</script>