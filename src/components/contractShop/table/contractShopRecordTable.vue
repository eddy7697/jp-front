<template>
    <div class="contractShopRecordTable">
        <div class="row">
            <div id="reNew" class="container">
                <div class="col-3 btn-md btn btn-danger" @click="reload()">更新</div>
                <div class="col-9 btn-md btn text-left">
                    <span>店家請於交易後 請按「更新」</span><br/>
                    <span>並於10分鐘內 按「回覆」並確認金額</span>
                </div>
            </div>
        </div>
        <b-table class="table table-striped" striped hover :items="list" :fields="fields">
              <template slot="confirm_status" slot-scope="data">
                  <button @click="receiptModal(data)" v-if="toDetimeShow(data)" class="btn btn-danger">請收款</button>
                  <button @click="receiptModal(data)" v-if="true" class="btn btn-success">明細</button>
              </template>
              <template slot="rating_id" slot-scope="data">
                  <button @click="evaluateModal(data)" v-if="showDetermine(data)" class="btn btn-success">評價</button>
              </template>
              <template slot="status" slot-scope="data">
                  <div>
                      {{statusTxt(data.value)}}
                  </div>
              </template>
              <template slot="description" slot-scope="data">
                  <div v-if="data['item'].description">
                      {{data['item'].description}} <i v-if="checkIsStorer(data)" class="fa fa-pencil" aria-hidden="true" @click="noteModalShow(data)"></i>
                  </div>
                  <div v-else>
                        <i v-if="checkIsStorer(data)" class="fa fa-pencil" aria-hidden="true" @click="noteModalShow(data)"></i>
                  </div>
              </template>
        </b-table>
        <div class="container footer">
            <div class="row text-center">
                 <div class="col-6 text-center">
                    <button class="btn-lg btn-success" @click="loadShopList('minus')">
                        {{this.$root.$options['languageSet']['PREVIOUSPAGE']}}
                    </button>
                </div>
                <div class="col-6 text-center">
                    <button  v-if="lastPage" class="btn-lg btn-success" @click="loadShopList('plus')">
                        {{this.$root.$options['languageSet']['NEXTPAGE']}}
                    </button>
                </div>
            </div>
        </div>
        <p class="hidden">{{subNavNu}}</p>
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: 'contractShopRecordTable',
        components: {
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            subNavNu() {
                if(this.$router.name == 'contractShop' && !this.$store.state.contractShop.tradeReceipt && this.$store.state.contractShop.subNavNu == 3) {
                    var startCnt = setInterval(()=>{
                        if(this.$store.state.contractShop.subNavNu == 3) {
                            this.loadShopList()
                        } else {
                            clearInterval(startCnt);
                        }
                    }, 30000)
                }
                return this.$store.state.contractShop.subNavNu
            }
        },
        methods: {
            reload() {
                this.loadShopList()
            },


            checkIsStorer(data) {
                if(data['from_member_account_uid'] !== this.uid){
                    return true
                }
                return false
            },
            toDetimeShow(data) {
                if(data['item']['confirm_status'] == 0 && data['item']['from_member_account_uid'] !== this.uid){
                    return true
                }
                return false
            },
            showDetermine(data) {
                if(data['item']['confirm_status'] == 1 && !data['item']['rating_id'] && data['item']['from_member_account_uid'] == this.uid){
                    return true
                }
                return false
            },
            stateShow(data) {
                if(data['item']['confirm_status'] !== 0 && data['item']['from_member_account_uid'] == this.uid){
                    return true
                }
                return false
            },  
            evaluateModal(data) {
                this.$store.dispatch('evaluateModal', {show: true, content: data})
            },
            receiptModal(data) {
                this.$store.dispatch('tradeReceipt', {show: true, content: data})
            },
            noteModalShow(data) {
                this.$store.dispatch('noteModal', {show: true, content: data})
            },
            statusTxt(status) {
                switch (status) {
                    case null:
                        return '未開放'
                        break;
                    case 0:
                        return '確認中'
                        break;
                    case 1:
                        return '已確認'
                        break;
                    case 2:
                        return '已拒絕'
                        break;
                    case 3:
                        return '退訂中'
                        break;
                    case 4:
                        return '已退訂'
                        break;
                    case 5:
                        return '已逾期'
                        break;
                    default:
                }
            },
            loadShopList(status) {
                if(status == 'minus' && this.number > 0){
                    this.number--
                }
                if(status == 'plus'){
                    this.number++
                }
                let data = {}
                data['url'] = `${this.$root.$options.api['api8']}?page=${this.number}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data']['data'].length == 0){
                            this.lastPage = false;
                            this.list = [];
                        }else{
                            this.lastPage = true;
                            this.list = item['data']['data']
                            item['data']['data'].forEach((item, index)=>{
                                this.list[index]['status'] = item['confirm_status']
                            })
                        }
                        console.log( this.list )
                    }
                })
            }
        },
        data() {
            return {
                number: 1,
                lastPage: true,
                list: null,
                fields: [
                    {
                        key: 'confirm_status',
                        label: '功能',
                        sortable: true
                    },
                    {
                        key: 'created_at',
                        label: '日期',
                        sortable: true
                    },
                    {
                        key: 'status',
                        label: '狀態',
                        sortable: true
                    },
                    {
                        key: 'from_member_account',
                        label: '帳號',
                        sortable: true
                    },
                    {
                        key: 'rating_id',
                        label: '評價',
                        sortable: true
                    },
                    {
                        key: 'number',
                        label: '交易編號',
                        sortable: true
                    },
                    {
                        key: 'description',
                        label: '備註',
                        sortable: false
                    }
                ]
            }
        },
        mounted() {
            this.loadShopList()
            window.scrollTo(0, 0);
        }
    }

</script>