

<template>
    <div class="toolRecord">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-table class="table table-dark" striped hover :items="items" :fields="fields"></b-table>
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
        name: 'toolRecord',
        data() {
            return {
                items: [],
                fields: {
                    name: {
                        label: '商品名稱',
                        sortable: true
                    },
                    quantity: {
                        label: '數量',
                        sortable: true
                    },
                    status: {
                        label: '狀態',
                        sortable: true
                    },
                    created_at: {
                        label: '使用日期',
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
                let year = new Date().getFullYear()
                let month = new Date().getMonth()+1
                let data = {}
                data['url'] = `${this.$root.$options.api['api47']}${year}/${month}?page=${this.page}&rows=15`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        if(item['data'].length == 0){
                            this.lastPage = false;
                            this.items = []
                        }else{
                            this.items = []
                            item['data'].forEach((item)=>{
                                let obj = {};
                                obj['name'] = item['item']['name']
                                obj['quantity'] = item['quantity']
                                obj['status'] = item['operate'] == 'obtain' ? '獲得' : '使用'
                                obj['created_at'] = item['created_at']
                                this.items.push(obj)
                            })
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