<template>
    <div class="chart">
        <i id="search" @click="show = !show" class="fa fa-search hidden" aria-hidden="true"></i>
        <transition name="fade">
            <div id="searchInput" v-if="show">
                <input @change="searchId()" v-model="findId" type="text" class="search form-control" placeholder="請輸入想收尋ID">
            </div>
        </transition>
        <i id="arrowLeft" @click="loadInit()" class="fa fa-arrow-circle-left" aria-hidden="true"></i>
        <organization-chart :datasource="dsForm" >
            <template slot-scope="{ nodeData }">
                <div class="text-left" style="background:white" @click="toCallApi(nodeData)">
                    <!-- <p><span class="text-primary">帳號:</span>{{nodeData.account_name}}</p> -->
                    <p><span class="text-primary">ID:</span>{{nodeData.uid}}</p>
                    <!-- <p><span class="text-primary">卡別:</span>{{nodeData.buff}}</p> -->
                    <p><span class="text-primary">姓名:</span>{{nodeData.name}}</p>
                    <p><span class="text-primary">暱稱:</span>{{nodeData.nickname}}</p>
                    <p><span class="text-primary">推薦人暱稱:</span>{{nodeData.recommender_account_nickname}}</p>
                    <!-- <p><span class="text-primary">邀請:</span>{{nodeData.recommender_account_name}}</p> -->
                </div>
            </template>
        </organization-chart>
    </div>
</template>

<script>  
    import OrganizationChart from 'vue-organization-chart'
    import 'vue-organization-chart/dist/orgchart.css'

    export default {
        name: 'chart',
        data () {
            return {
               level: 2,
               apiUid: '',
               dsForm: {
                   uid: '',
                   name: '',
                   children: []
               },
               previousID: [],
               floor: 0,
               show: false,
               findId: ''
            }
        },
        computed: {
        },
        components: {
            OrganizationChart
        },
        methods:{
            toCallApi(data) {
                this.floor++
                this.apiUid = data.uid
                this.previousID.push(data.uid)
                this.getChartData()
            },
            loadInit() {
                this.floor--
                this.previousID.splice(-1,1)
                console.log(this.previousID)
                let data = {}
                data['url'] = `${this.$root.$options.api['api20']}${this.previousID[this.floor]}/nodes`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        console.log('4321', item['data'])
                        this.dsForm = item['data']
                    }
                })
            },
            searchId() {
                let data = {}
                this.previousID = []
                this.previousID.push(this.findId)
                data['url'] = `${this.$root.$options.api['api20']}${this.findId}/nodes`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        console.log('4321', item['data'])
                        this.dsForm = item['data']
                    }
                })
            },
            getChartData() {
                let data = {}
                if(this.apiUid){
                    data['url'] = `${this.$root.$options.api['api20']}${this.apiUid}/nodes`
                } else {
                    data['url'] = `${this.$root.$options.api['api20']}?depth=${this.level}`
                }

                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        console.log('4321', item['data'])
                        this.dsForm = item['data']
                    }
                })
            }
        },
        mounted() {
            // console.log(this.$store.state.memberInfo.userInfo['uid'])
            this.previousID.push(this.$store.state.memberInfo.userInfo['uid'])
            // this.apiUid = this.$store.state.memberInfo.userInfo['uid']
            this.getChartData()
            this.dsfun
        }
    }
</script>
