<template>
    <div class="shopIndex">
        <div class="icon" @click="redirect('contractShop')">
            <img src="@/assets/images/mainPage/find_shop.png" alt="">
        </div>
        <div class="icon" @click="qrCodeScan()">
            <img src="@/assets/images/mainPage/qrcode.png" alt="">
        </div>
        <div class="icon" @click="redirect('contractRecord')">
            <img src="@/assets/images/mainPage/Evalu.png" alt="">
        </div>
        <div class="icon" @click="redirect('receivePage')">
            <img src="@/assets/images/mainPage/getEnv.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'shopIndex',
        methods: {
            qrCodeScan() {
                this.$store.dispatch('qrCodeScanner', true)
            },
            redirect(url) {
                if(url == 'contractRecord') {
                    this.$store.dispatch('subNavNu', 3)
                    this.$router.push('contractShop')
                    return
                }
                if(url == 'contractShop') {
                    this.$store.dispatch('subNavNu', 1)
                    this.$router.push('contractShop')
                    return
                }
                this.$router.push(url)
            }
        }
    }
</script>