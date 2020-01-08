<template>
    <div class="coinInfoMobile">
        <div class="coinInfoPanel">
            <div class="newest-price">
                {{currency}}
                <span class="buyingButton" @click="openModal()">購買</span>
            </div>
            <div class="ucoin-balance">
                {{quantity}}
            </div>
            <div class="uCoin">
                <img id="UCoin" class="uDiv img-responsive" src="~@/assets/images/tradePanel/U.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'coinInfoMobile',
        data() {
            return {
                currency: '0',
                quantity: '0'
            }
        },
        methods: {
            openModal() {
                this.$store.dispatch('buyingModal', true)
            }
        },
        mounted() {
            let data = {}
            data['url'] = this.$root.$options.api['api34']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', item)
                } else {
                    if(item['data'].length > 0) {
                        this.currency = Number(item['data'][0]['currency']).toLocaleString()
                        this.quantity = Number(item['data'][0]['point']).toLocaleString()
                    }
                     
                }
            })
        }
    }    
</script>