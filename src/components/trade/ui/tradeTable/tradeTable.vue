<template>
    <div class="tradeTable">
        <tradeSubNav v-if="toogleSubNav == '2'"/>
        <tradeHistoryTable v-if="toogleSubNav == '3'"/>
        <commissionTable v-if="toogleSubNav == '1'" />
    </div>
</template>

<script>
    import tradeSubNav from '@/components/trade/ui/tradeTable/tradeHistoryTable/tradeSubNav'
    import tradeHistoryTable from '@/components/trade/ui/tradeTable/tradeHistoryTable/tradeHistoryTable'
    import commissionTable from '@/components/trade/ui/tradeTable/commission/commissionTable'

    export default {
        name: 'tradeTable',
        data() {
            return {
                text: '1'
            }
        },
        components: {
            tradeSubNav,
            tradeHistoryTable,
            commissionTable
        },
        computed: {
            toogleSubNav() {
                return this.$store.state.subNav.tradeSubNav
            }
        },
        mounted(){
        }
    }
</script>