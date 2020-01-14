<template>
    <div class="tradeSec">
        <div class="container">
            <div class="row">  
                <div class="tradeNav">
                    <div :class="{active: isActive == '1'}"
                    @click="()=>{clickNav('1')}">委託</div>
                    <div 
                    :class="{active: isActive == '2'}"
                    @click="()=>{clickNav('2')}">交易</div>
                    <div
                    :class="{active: isActive == '3'}"
                    @click="()=>{clickNav('3')}"
                    >{{txT['RECORD']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tradeSec',
        props: {

        },
        data() {
            return {
                isActive: '2'
            }
        },
        methods: {
            clickNav(nu) {
                this.isActive = nu
                this.$store.dispatch('toggleNav', false)
                this.$store.dispatch('tradeSubNav', nu)
            }
        },
        computed: {
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        mounted() {

        }
    }
</script>
