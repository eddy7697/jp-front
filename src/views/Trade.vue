<template>
    <div class="Trade">
        <coinInfo/>
        <tradeSec/>
        <tradeTable />
        <buyingModal v-if="buyingModal" />
    </div>
</template>
<script>
    import coinInfo from '@/components/trade/ui/coinPanel/coinInfo'
    import tradeSec from '@/components/secondNav/tradeSec'
    import tradeTable from '@/components/trade/ui/tradeTable/tradeTable'
    import buyingModal from '@/components/modals/trade/buyingModal'
    export default {
        name: 'Trade',  
        components: {
            coinInfo,
            tradeSec,
            tradeTable,
            buyingModal
        },
        computed: {
            buyingModal() {
                return this.$store.state.modalControl.buyingModal
            }
        }
    }

</script>
