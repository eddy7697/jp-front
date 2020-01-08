<template>
    <div class="subMenu">
        <div class="item" @click="toggle(1)" :class="{'active': active == 1}">
            <img :src="imgOne" alt="">
            <div>店家介紹</div>
        </div>
        <div class="item" @click="toggle(2)" :class="{'active': active == 2}">
            <img :src="imgTwo" alt="">
            <div>交易QR code</div>
        </div>
        <div class="item" @click="toggle(3)" :class="{'active': active == 3}">
            <span class="notified_untrade" v-if="waitTrade>0">{{waitTrade}}</span>
            <img :src="imgThree" alt="">
            <div>確認/評價</div>
        </div>
        <div class="item" @click="toggle(4)" :class="{'active': active == 4}">
            <img :src="imgFour" alt="">
            <div>喜愛商店</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'subMenu',
        data() {
            return {
                active: 1,
                recordTable: false,
                waitTrade: 0
            }
        },
        components: {
        },
        methods: {
            toggle(nu) {
                this.active = nu
                this.$store.dispatch('subNavNu', this.active)
                this.$store.dispatch('toggleNav', false)
                if(nu == 2){
                    this.openQrCode()
                    return
                }
                this.recordTable = false
                this.$store.dispatch('toggleTable', this.recordTable)
                if(nu == 3){
                    this.recordTable = true
                    this.$store.dispatch('toggleTable', this.recordTable)
                }
            },
            openQrCode() {
               this.$store.dispatch('qrCodeModal', true)
               this.$store.dispatch('qrCodeScanner', false)
               window.scroll(0, 0)
            }
        },
        computed: {
            imgOne() {
                this.active = this.$store.state.contractShop.subNavNu
                if(this.active == 3){
                    this.recordTable = true
                    this.$store.dispatch('toggleTable', this.recordTable)
                }
                this.waitTrade = this.$store.state.memberInfo.userInfo.contract_store_wait_trade
                if(this.active == 1)
                return require('@/assets/images/contractShop/icon_cs_shop_h.png')
                else
                return require('@/assets/images/contractShop/icon_cs_shop.png')
            },
            imgTwo() {
                if(this.active == 2)
                return require('@/assets/images/contractShop/icon_cs_qrcode_h.png')
                else
                return require('@/assets/images/contractShop/icon_cs_qrcode.png')
            },
            imgThree() {
                if(this.active == 3)
                return require('@/assets/images/contractShop/icon_cs_note_h.png')
                else
                return require('@/assets/images/contractShop/icon_cs_note.png')
            },
            imgFour() {
                if(this.active == 4)
                return require('@/assets/images/contractShop/icon_cs_likeshop_h.png')
                else
                return require('@/assets/images/contractShop/icon_cs_likeshop.png')
            }
        }

    }
</script>