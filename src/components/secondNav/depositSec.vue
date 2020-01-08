<template>
    <div class="depositSec">
        <div class="container">
            <div class="row">  
                <div class="depositNav">
                    <div 
                    :class="{active: isActive == '2'}"
                    @click="()=>{clickNav('2')}">儲值</div>
                    <div 
                    :class="{active: isActive == '3'}"
                    @click="()=>{clickNav('3')}">紀錄</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'depositSec',
        props: {

        },
        data() {
            return {
            }
        },
        computed: {
            isActive() {
                return this.$store.state.subNav.depositNav
            }
        },
        methods: {
            clickNav(nu) {
                this.$store.dispatch('toggleNav', false)
                this.$store.dispatch('depositNav', nu)
                // this.isActive = nu;
                if(this.isActive == '3') {
                    this.$store.dispatch('depositTable', true)
                    return 
                } 
                this.$store.dispatch('depositTable', false)
            }
        },
        mounted() {

        }
    }
</script>