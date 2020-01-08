<template>
    <div class="qrGroupCode">
        <div class="content">
            <div class="cancel">
                <img @click="cancelQRcode()" src="~@/assets/images/modals/icon-cancel.png" />
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p class="qrCodeString">
                            {{returnCopyUrl}}
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button  class="btn-md btn btn-primary" v-clipboard:copy="returnCopyUrl">
                            複製網址
                        </button>
                    </div>
                </div>
            </div>
            <canvas id="canvas">
            </canvas>
        </div>
    </div>
</template>
<script>
    import QRCode from 'qrcode'
    export default {
        name: 'qrGroupCode',
        props:{
            auth: ''
        },
        methods: {
            cancelQRcode() {
                this.$store.dispatch('qrGroupCode', false)
            }
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            name() {
                return this.$store.state.memberInfo.userInfo.nickname
            },
            returnCopyUrl() {
                return `${process.env.VUE_APP_DOMAIN_URL}?Registration=true&auth=${this.auth}`
            }
        },
        mounted(){
             var qrCodeUrl = `${process.env.VUE_APP_DOMAIN_URL}?Registration=true&auth=${this.auth}`
             QRCode.toCanvas(document.getElementById('canvas'), qrCodeUrl, {
                 version: 8
             },function (error) {
                console.log('success!');
            })
        }
    }
</script>