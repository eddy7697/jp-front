<template>
    <div class="buffQrCode">
        <div class="content">
            <div class="cancel">
                <img @click="cancelQRcode()" src="~@/assets/images/modals/icon-cancel.png" />
            </div>
            <div id="qrCodeSQ" class="container">
                <h5 class="text-center text-danger">推薦人ID:{{uid}}</h5>
                <div class="row">
                    <div class="col-12">
                        <p class="qrCodeString">
                            {{qrCodeUrlForCopy}}
                        </p>
                    </div>
                    <div class="col-12 text-center">
                        <button  class="btn-md btn btn-primary" v-clipboard:copy="qrCodeUrlForCopy">
                            複製網址
                        </button>
                    </div>
                    <div id="buffQR" class="col-12 text-center">
                        請使用外部相機或QR Code App掃描 <br/> 
                        請勿使用網頁內建掃描
                    </div>
                </div>
            </div>
            <canvas id="canvas">
            </canvas>
            <h6 class="text-right">
                <p>您的發財卡到期時間:</p>
                <p>{{effective}}</p>                
            </h6>
        </div>
    </div>
</template>
<script>
    import QRCode from 'qrcode'
    export default {
        name: 'buffQrCode',
        methods: {
            cancelQRcode() {
                this.$store.dispatch('buffQrCode', {show: false, content: ''})
            },
            onCopy: function (e) {
                alert('You just copied: ' + e.text)
            }
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            name() {
                return this.$store.state.memberInfo.userInfo.nickname
            },
            qrContentAuth() {
                return this.$store.state.modalControlOne.buffQrCodeContent.config.auth
            },
            effective() {
                return this.$store.state.modalControlOne.buffQrCodeContent.config.effective
            },
            qrCodeUrlForCopy() {
                return `${process.env.VUE_APP_DOMAIN_URL}?Registration=true&auth=${this.qrContentAuth}`
            }
        },
        mounted(){
            var qrCodeUrl = `${this.qrCodeUrlForCopy}`
            console.log(qrCodeUrl)
            QRCode.toCanvas(document.getElementById('canvas'), qrCodeUrl, {
                version: 8
            },function (error) {
            })
        }
    }
</script>