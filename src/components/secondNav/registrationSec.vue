<template>
    <div class="registrationSec">
        <div class="container">
            <div class="row">  
                <div class="registrationNav">
                    <div 
                    :class="{active: isActive == '2'}"
                    @click="()=>{clickNav('2')}">會員註冊</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'registrationSec',
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