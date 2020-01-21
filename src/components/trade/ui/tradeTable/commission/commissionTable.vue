<template>
    <div class="commissionTable">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-table class="table thead-dark" striped hover :items="items" :fields="fields">
                        <template slot="operate" slot-scope="data">
                            <h6 class="text-primary" v-if="data['item'].operate == 'expenses'">拍賣</h6>
                            <h6 class="text-success" v-if="data['item'].operate == 'income'">購入</h6>
                        </template>
                        <template slot="point" slot-scope="data">
                            <h6 class="text-success">
                                {{Number(data['item']['point']).toLocaleString()}}
                            </h6>
                        </template>
                        <template slot="price" slot-scope="data">
                            <h6 class="text-primary">
                                {{Number(data['item']['price']).toLocaleString()}}
                            </h6>
                        </template>
                        <template slot="time_left" slot-scope="data">
                            <h6 class="text-danger">
                                {{Number(data['item']['time_left']).toLocaleString()}} 小時
                            </h6>
                        </template>
                        <template slot="function" slot-scope="data">
                            <button @click="cancelCom(data)" class="btn btn-sm btn-primary" v-if="data['item'].uid == uid">{{this.$root.$options['languageSet']['CANCEL']}}</button>
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
    import redirect from './../../../../../redirect'

    export default {
        name: 'commissionTable',
        data() {
            return {
                items: null,
                fields: {
                    operate: {
                        label: '類別',
                        sortable: true
                    },
                    point: {
                        label: '回饋幣',
                        sortable: true
                    },
                    price: {
                        label: '單價',
                        sortable: true
                    },
                    time_left: {
                        label: '剩餘',
                        sortable: true
                    },
                    function: {
                        label: '功能',
                        sortable: true
                    }
                },
                lastPage: true,
                page: 1
            }
        },
        methods: {
            cancelCom(item) {
                let data = {};
                data['url'] = `${this.$root.$options.api['api29']}${item['item']['operate']}/${item['item'].serial}`
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
                data['url'] = `${this.$root.$options.api['api31']}?page=${this.page}&rows=5`
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
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            }
        },
        mounted() {
            this.toLoadData()
        }
    }
</script>