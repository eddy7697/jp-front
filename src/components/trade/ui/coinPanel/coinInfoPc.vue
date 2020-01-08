<template>
    <div class="coinInfoPc">
        <div class="coinInfoPanel">
            <div class="newest-price">
                <div class="buyingButton" @click="openModal()">購買</div>
                <div class="currency">{{Number(currency).toLocaleString()}}</div>
            </div>
            <div class="ucoin-balance">
                {{Number(quantity).toLocaleString()}}
            </div>
            <div class="uCoin">
                <img id="UCoin" class="uDiv img-responsive" src="~@/assets/images/tradePanel/U.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'coinInfoPc',
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
                        this.currency = item['data'][0]['currency']
                        this.quantity = item['data'][0]['point']
                    }
                }
            })
        }
    }    
</script>