<template>
    <div class="myGoodFd">
        <div class="container">
            <div id="extraCol" class="row">
                <div class="col-6 text-left">
                </div>
                <div class="col-6 text-right  hidden">
                    <button class="blue-link" @click="openAuthBuy()">好友帳戶刪除申請</button>
                </div>
            </div>
            <div class="row" id="tableArea">
                <b-table class="table thead-dark" striped hover :items="expenses" :fields="fields">
                    <!-- <template slot-name="uid" data="data">
                        <div>
                            
                        </div>
                    </template> -->
                </b-table>  
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
        name: 'myGoodFd',
        components: {
        },
        computed: {
            buyModal() {
            },
            authBuyModal() {
            }
        },
        methods: {
            openAuthBuy() {
                this.$store.dispatch('authBuyModal', true);
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
                data['url'] = `${this.$root.$options.api['api25']}?page=${this.page}&group=tree`
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
                
            }
        },
        data() {
            return {
                expenses: null,
                fields: {
                    account_name: {
                        label: '帳號',
                        sortable: true
                    },
                    nickname: {
                        label: '暱稱',
                        sortable: true
                    },
                    uid: {
                        label: 'ID',
                        sortable: true
                    },
                    line_id: {
                        label: 'LINE',
                        sortable: true
                    },
                    created_at: {
                        label: '建立日期',
                        sortable: true
                    },
                },
                lastPage: true,
                page: 1,
            }
        },
        mounted() {
            this.toLoadData()
        }
    }
</script>