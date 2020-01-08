<template>
    <div class="contractShopSec">
        <div class="contractNav">
            <div 
            :class="{active: isActive == '2'}"
            @click="()=>{clickNav('2')}">特約商店</div>
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
        mounted() {

        }
    }
</script>