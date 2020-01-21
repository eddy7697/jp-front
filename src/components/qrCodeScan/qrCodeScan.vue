<template>
    <div class="qrCodeScan">
        <div class="content">
            <p class="error">{{ error }}</p>
            <!-- <p class="decode-result">Last result: <b>{{ result }}</b></p> -->
            <QrcodeStream @decode="onDecode" @init="onInit($event)"  />
            <div class="container" style="margin-bottom:5px;">
                <div class="row" id="alignBox">
                    <button class="form-control" @click="cancelScan()">{{this.$root.$options['languageSet']['CANCEL']}}</button>
                    <button class="form-control" @click="myQrCode()">交易QRcode</button>
                </div>
            </div>
            <div class="container" style="margin-bottom:5px;">
                <img class="img-responsive" src="@/assets/images/qrCodeImages/scanner-support-info.png" alt="">
                <p>上方未正常出現相機畫面?
                    <a target="_blank" href="https://web.fbk168.com/assets/camera01.jpg">[解決辦法]</a>
                </p>
                <p>或利用
                    <a target="_blank" href="https://web.fbk168.com/assets/camera02.jpg">[不使用相機掃描交易]</a></p>
            </div>
        </div>
    </div>
</template>
<script>
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
    export default {
        name: 'qrCodeScan',
        data(){
            return {
                result: '',
                error: ''
            }
        },
        components:  {
            QrcodeStream,
            QrcodeDropZone,
            QrcodeCapture
        },
        methods: {
            getP(queryString) {
                var query = {};
                var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
                return query;
            },
            onDecode (result) {
                this.result = result
                 var urlParams = this.getP(this.result)
                window.location = `/#/?contractShop=true&name=${urlParams['name']}&uid=${urlParams['uid']}`
                this.cancelScan()
                // this.$router.push('/contractShop')
                // this.$store.dispatch('scModal',  {show: true, content: {'name': urlParams['name'], 'uid': urlParams['uid']}})
                // this.$store.dispatch('scModal', {show: true, content: {'name': urlParams['name'], 'uid': urlParams['uid']}})
            },
            async onInit (promise) {
                console.log(navigator.mediaDevices)
                if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                   console.log("Let's get this party started")
                } else {
                    const stream = await navigator.mediaDevices.getUserMedia({video: true})
                }
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permisson"
                    } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                    } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                    } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                    }
                    console.log(error)
                }
            },
            cancelScan() {
                this.$store.dispatch('qrCodeScanner', false)
            },
            myQrCode() {
                this.$store.dispatch('qrCodeModal', true)
                this.$store.dispatch('qrCodeScanner', false)
                window.scroll(0, 0)
            }
        },
        mounted() {
            // navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            // if (navigator.mediaDevices.getUserMedia) {
            //     navigator.mediaDevices.getUserMedia({ video: true })
            //     .then(function (stream) {
            //                 //Display the video stream in the video object
            //     })
            //     .catch(function (e) { logError(e.name + ": " + e.message); });
            // }
            // else {
            // navigator.getWebcam({ video: true }, 
            //     function (stream) {
            //             //Display the video stream in the video object
            //     }, 
            //     function () { logError("Web cam is not accessible."); });
            // }
        }
    }
</script>