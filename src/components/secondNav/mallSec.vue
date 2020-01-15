<template>
    <div class="mallSec">
        <div class="container">
            <div class="row">  
                <div class="mallNav">
                    <div :class="{active: nav == '1'}"
                    @click="()=>{clickNav('1')}">
                    {{this.$root.$options['languageSet']['MYTOOLS']}}
                    </div>
                    <div 
                    :class="{active: nav == '2'}"
                    @click="()=>{clickNav('2')}">商城</div>
                    <div
                    :class="{active: nav == '3'}"
                    @click="()=>{clickNav('3')}"
                    >{{txT['RECORD']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'mallSec',
        props: {
            nav: ''
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
                this.$store.dispatch('mallNav', nu)
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