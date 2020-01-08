<template>
    <div class="ContractShop">
        <giftPanel />
        <contractShopCarousel />
        <!-- <newsMarquee/> -->
        <contractShopSec />
        <subMenu />
        <category v-if="!toggleTable"/>
        <contractShopRecordTable v-if="toggleTable"/>
        <shop v-if="openItem"/>
        <scPay v-if="scModal" />
        <tradeReceipt v-if="tradeReceipt"/>
        <evaluateModal v-if="evaluateModal"/>
        <note v-if="noteShow"/>
    </div>
</template>
<script>
    import giftPanel from '@/components/giftPanel/giftPanel'
    import contractShopCarousel from '@/components/contractShop/ui/carousel'
    import contractShopSec from '@/components/secondNav/contractShopSec'
    import subMenu from '@/components/contractShop/ui/subMenu'
    import category from '@/components/contractShop/category/category'
    import newsMarquee from '@/components/newsMarquee/newsMarquee'
    import shop from '@/components/contractShop/shops/shop'
    import scPay from '@/components/modals/scPay/scPay'
    import contractShopRecordTable from '@/components/contractShop/table/contractShopRecordTable'
    import tradeReceipt from '@/components/contractShop/tradeReceipt/receipt'
    import note from '@/components/contractShop/noteModal/note'
    import evaluateModal from '@/components/contractShop/ui/modals/evaluateModal'
    import buffQrCode from '@/components/buff/buffQrCode'

    export default {
        name: 'ContractShop',
        components: {
            contractShopCarousel,
            contractShopSec,
            subMenu,
            category,
            newsMarquee,
            shop,
            scPay,
            contractShopRecordTable,
            tradeReceipt,
            evaluateModal,
            buffQrCode,
            note,
            giftPanel
        },
        methods: {
        },
        computed: {
            openItem() {
                return this.$store.state.contractShop.openItem
            },
            scModal() {
                return this.$store.state.modalControl.scModal
            },
            toggleTable() {
                return this.$store.state.contractShop.toggleTable
            },
            tradeReceipt() {
                return this.$store.state.contractShop.tradeReceipt
            },
            evaluateModal() {
                return this.$store.state.contractShop.evaluateModal
            },
            noteShow() {
                // console.log(this.$store.state.contractShop.noteModal)
                return this.$store.state.contractShop.noteModal
            },
            buffQrCode() {
                return this.$store.state.modalControlOne.buffQrCode
            },
        },
        mounted() {
            let data = {}
            data['openItem'] = false
            data['item'] = {}
            this.$store.dispatch('openItem', data)
        }
    }
</script>