<template>
    <div class="depositTable">
        <div class="row">
            <div class="container">
                <div class="col-12">
                    <div class="btn btn-primary btn-md" @click="toLoadTableData()">
                        {{this.$root.$options['languageSet']['UPDATESTATUS']}}
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-table class="table table-striped" striped hover :items="items" :fields="fields">
                        <template slot="confirm_status" slot-scope="data">
                            <h6 v-if="data['item']['confirm_status'] == 0" class="text-gray">
                                {{this.$root.$options['languageSet']['NOTRELEASE']}}
                            </h6>
                            <h6 v-if="data['item']['confirm_status'] == 1" class="text-gray">
                                {{this.$root.$options['languageSet']['RELEASED']}}
                            </h6>
                            <h6 v-if="data['item']['confirm_status'] == 2" class="text-gray">
                                {{this.$root.$options['languageSet']['REJECTRELEASED']}}
                            </h6>
                            <h6 v-if="data['item']['confirm_status'] == 3" class="text-gray">
                                {{this.$root.$options['languageSet']['CANCELORDER']}}
                            </h6>
                            <h6 v-if="data['item']['confirm_status'] == 4" class="text-gray">
                                {{this.$root.$options['languageSet']['ALREADICANCEL']}}
                            </h6>
                            <h6 v-if="data['item']['confirm_status'] == 5" class="text-gray">
                                {{this.$root.$options['languageSet']['CANCELORDER']}}
                            </h6>
                        </template>
                        <template slot="payment_type" slot-scope="data">
                            <h6 v-if="data['item']['payment_type'] == 1" class="text-success">{{this.$root.$options['languageSet']['CREDIT_CARD']}}</h6>
                            <h6 v-if="data['item']['payment_type'] == 2" class="text-primary">ATM</h6>
                        </template>
                        <template slot="cancelAction" slot-scope="data">
                            <button  v-if="data['item']['confirm_status'] == 0" class="btn btn-lg btn-danger col-6" @click="reject(data)">{{this.$root.$options['languageSet']['CANCEL']}}</button>
                            <button  v-if="false" class="btn btn-lg btn-success col-6" @click="cancelThis(data)">重試</button>
                        </template>
                    </b-table>
                </div>
            </div>
        </div>
         <div class="row btn-area-footer">
            <div class="container">
                <div class="btn btn-sm col-6" @click="toLoadTableData('minus')">{{this.$root.$options['languageSet']['PREVIOUSPAGE']}}</div>
                <div class="btn btn-sm col-6" @click="toLoadTableData('plus')" v-if="lastPage">{{this.$root.$options['languageSet']['NEXTPAGE']}}</div>
            </div>
        </div>
        <form id="ecform" class="hidden" action="" method="POST">
            <input type="submit" value="Submit">
        </form> 
    </div>
</template>
<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import redirect from './../../redirect'
    import ecForm from './../../ecForm'
    export default {
        name: 'depositTable',
        data() {
            return {
                items: [],
                fields: {
                    amount: {
                        label: this.$root.$options['languageSet']['ORDERPRICE'],
                        sortable: true
                    },
                    confirm_status: {
                        label: this.$root.$options['languageSet']['RELEASEDSTATUS'],
                        sortable: true
                    },
                    created_at: {
                        label: this.$root.$options['languageSet']['APPLY'],
                        sortable: true
                    },
                    payment_type: {
                        label: this.$root.$options['languageSet']['THE_WAY_OF_PAYING'],
                        sortable: true
                    },
                    number: {
                        label: this.$root.$options['languageSet']['ORDER_NUMBER'],
                        sortable: true
                    },
                    cancelAction: {
                        label: this.$root.$options['languageSet']['CANCEL_ORDER'],
                        sortable: true
                    }
                },
                lastPage: true,
                page: 1,
                type: ''
            }
        },
        methods: {
            reject(item){
                let data = {};
                data['url'] = `${this.$root.$options.api['api38']}${item['item']['id']}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                // data['number'] = this.msgTxt
                console.log(data)
                this.$store.dispatch('delApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/deposit', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            },
            cancelThis(item){
                let data = {};
                data['url'] = `${this.$root.$options.api['api39']}${item['item']['id']}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                // data['number'] = this.msgTxt
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        ecForm.ecPay(result['data'])
                    }
                })
            },
            toLoadTableData(status){
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }
                let data = {}
                data['url'] = `${this.$root.$options.api['api43']}?page=${this.page}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data'].length == 0){
                            this.lastPage = false;
                            this.item = [];
                        }else{
                             this.items = item['data']
                        }
                    }
                })
            }
        },
        mounted(){
            this.toLoadTableData()
            window.scrollTo(0, 0);
        }
    }

</script>