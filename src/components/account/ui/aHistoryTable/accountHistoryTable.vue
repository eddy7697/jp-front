<template>
    <div class="accountHistoryTable">
        <coinsHistoryNav />
        <allCoinTable  :items="item" v-if="coinSubNav == 'all'" />
        <bonusTable :items="item" v-if="coinSubNav == 'bonus'" />
        <giftTable :items="item" v-if="coinSubNav == 'gift'" />
        <goldCoinTable :items="item" v-if="coinSubNav == 'gold'" />
        <ucoinTable :items="item" v-if="coinSubNav == 'ucoin'" />
    </div>
</template>
<script>
    import coinsHistoryNav from '@/components/account/ui/aHistoryTable/coinsTable/coinsHistoryNav'
    import allCoinTable from '@/components/account/ui/aHistoryTable/coinsTable/coinsHistoryTable/allCoinTable'
    import bonusTable from '@/components/account/ui/aHistoryTable/coinsTable/coinsHistoryTable/bonusTable'
    import giftTable from '@/components/account/ui/aHistoryTable/coinsTable/coinsHistoryTable/giftTable'
    import goldCoinTable from '@/components/account/ui/aHistoryTable/coinsTable/coinsHistoryTable/goldCoinTable'
    import ucoinTable from '@/components/account/ui/aHistoryTable/coinsTable/coinsHistoryTable/ucoinTable'

    export default {
        name: 'accountHistoryTable',
        data() {
            return {
                item: [],
                lastPage: true,
                page: 1,
                type: ''
            }
        },
        components: {
            coinsHistoryNav,
            allCoinTable,
            bonusTable,
            giftTable,
            goldCoinTable,
            ucoinTable
        },
        methods: {
            toLoadTableData(status, type) {
                console.log(type)
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }

                let year = new Date().getFullYear()
                let month = new Date().getMonth()+1
                let data = {}
                if(this.coinSubNav == 'all'){
                    data['url'] = `${this.$root.$options.api['api5']}${year}/${month}?page=${this.page}&rows=15`
                } else {
                    data['url'] = `${this.$root.$options.api['api5']}${year}/${month}?page=${this.page}&rows=15&type=${type}`
                }
                data['url'] = `${this.$root.$options.api['api5']}${year}/${month}?page=${this.page}&rows=15`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        if(item['data'].length == 0){
                            this.lastPage = false;
                            this.item = [];
                        }else{
                             this.item = item['data']
                        }
                    }
                })
            }
        },
        computed: {
            coinSubNav() {
                return this.$store.state.subNav.coinSubNav
            }
        },
        mounted() {
            this.toLoadTableData('', this.coinSubNav)
        }
    }
</script>