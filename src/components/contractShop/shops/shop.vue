<template>
    <div class="shop">
        <div class="content">
            <button class="btn btn-success col-12 text-left" @click="closeWin()" >
                <img class="arrowIcon" src="~@/assets/images/modals/arrrow.png" alt="" >
                回到商店
            </button>
            <!-- <img src="~@/assets/images/modals/icon-cancel.png" alt="" > -->
            <contractShopCarousel :item="selectedItem" />
            <shopDesc :item="selectedItem" />
            <stars :item="selectedItem" />
            <div class="cancel text-center">
                <button class="btn" @click="closeWin()">
                    關閉
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import contractShopCarousel from '@/components/contractShop/ui/carousel'
    import shopDesc from '@/components/contractShop/shops/shopDesc'
    import stars from '@/components/contractShop/stars/stars'

    export default {
        name: 'shop',
        components: {
            contractShopCarousel,
            shopDesc,
            stars
        },
        methods: {
            closeWin() {
                this.$store.dispatch('openItem', false)
            },
        },
        computed: {
            selectedItem() {
                return this.$store.state.contractShop.item
            }
        }
    }
</script>