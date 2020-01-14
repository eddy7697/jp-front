<template>
    <div class="receiveSec">
        <div class="container">
            <div class="row">  
                <div class="receiveNav">
                    <div 
                    :class="{active: isActive == '2'}"
                    @click="()=>{clickNav('2')}">{{txT['NEWS']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'newsSec',
        props: {

        },
        data() {
            return {
                isActive: '2'
            }
        },
        methods: {
            clickNav(nu) {
                this.isActive = nu;
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