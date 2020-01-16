<template>
    <div class="mp">
        <div class="container">
            <div id="extraCol" class="row">
                <div class="col-6 text-left">
                </div>
                <div class="col-6 text-right">
                    <button class="blue-link btn-md btn btn-primary hidden" @click="openAuthBuy()">發財條碼</button>
                </div>
            </div>
            <div class="row" id="tableArea">
                <b-table class="table thead-dark" striped hover :items="expenses" :fields="fields">
                    <template slot="group" slot-scope="data">
                        <button  @click="openGroupThisModal(data)" class="btn btn-primary">加入社群</button>
                    </template>
                </b-table>  
            </div>
            <div class="row btn-area-footer">
                <div class="container">
                    <div class="btn btn-sm col-6" @click="toLoadTableData('minus')">{{this.$root.$options['languageSet']['PREVIOUSPAGE']}}</div>
                    <div class="btn btn-sm col-6" @click="toLoadTableData('plus')" v-if="lastPage">{{this.$root.$options['languageSet']['NEXTPAGE']}}</div>
                </div>
            </div>
        </div> 
        <openGroupModal :parentId="parentId" v-if="openGroupModal" />    
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import openGroupModal from '@/components/group/qrGroupCode/openGroupModal'
    export default {
        name: 'mp',
        components: {
            openGroupModal
        },
        computed: {
            buyModal() {
            },
            authBuyModal() {
            },
            openGroupModal() {
                return this.$store.state.modalControlOne.openGroupModal
            }
        },
        methods: {
            openGroupThisModal(data) {
                console.log('mutha',data['item']['uid'])
                this.parentId = data['item']['uid']
                this.$store.dispatch('openGroupModal', {show: true, content: ''})   
            },
            openAuthBuy() {
                this.$store.dispatch('authBuyModal', true);
            },
            toLoadTableData(status, type) {
                // console.log(type)
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }
                let year = new Date().getFullYear()
                let month = new Date().getMonth()+1
                let data = {}
                data['url'] = `${this.$root.$options.api['api25']}?page=${this.page}&group=general`
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
                    created_at: {
                        label: '加入日期',
                        sortable: true
                    },
                    gold: {
                        label: '金幣',
                        sortable: true
                    },
                    ucoin: {
                        label: '回饋幣',
                        sortable: true
                    },
                    bonus: {
                        label: '紅利',
                        sortable: true
                    },
                    gift: {
                        label: '禮券',
                        sortable: true
                    },
                    line_id: {
                        label: 'LINE',
                        sortable: true
                    },
                    group: {
                        label: '加入社群',
                        sortable: true
                    }
                },
                parentId: '',
                lastPage: true,
                page: 1,
                type: ''
            }
        },
        mounted() {
            this.toLoadTableData()
        }
    }
</script>