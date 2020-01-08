<template>
    <div class="qrCode">
        <div class="content">
            <div class="cancel">
                <img @click="cancelQRcode()" src="~@/assets/images/modals/icon-cancel.png" />
            </div>
            <canvas id="canvas">
            </canvas>
        </div>
    </div>
</template>
<script>
    import QRCode from 'qrcode'
    export default {
        name: 'qrCode',
        methods: {
            cancelQRcode() {
                this.$store.dispatch('qrCodeModal', false)
            }
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            name() {
                return this.$store.state.memberInfo.userInfo.nickname
            }
        },
        mounted(){
             var qrCodeUrl = `${process.env.VUE_APP_DOMAIN_URL}?contractShop=true&name=${this.name}&uid=${this.uid}`
             QRCode.toCanvas(document.getElementById('canvas'), qrCodeUrl, {
                 version: 8
             },function (error) {
                console.log('success!');
            })
        }
    }
</script>