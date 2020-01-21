<template>
    <div class="receiveSec">
        <div class="container">
            <div class="row">  
                <div class="receiveNav">
                    <div 
                    :class="{active: isActive == '2'}"
                    @click="()=>{clickNav('2')}">
                    {{this.$root.$options['languageSet']['MAIL_BOX']}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'receiveSec',
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
        mounted() {

        }
    }
    
</script>