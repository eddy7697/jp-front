<template>
    <div class="Deposit">
        <depositSec/>
        <depositCards v-if="!depositTable"/>
        <depositTable v-if="depositTable"/>
    </div>
</template>
<script>
    import depositSec from '@/components/secondNav/depositSec'
    import depositCards from '@/components/deposit/depositCards'
    import depositTable from '@/components/tables/depositTable'
    
    export default {
        name: 'Deposit',
        components: {
            depositSec,
            depositCards,
            depositTable,
            depositTable
        },
        computed: {
            depositTable() {
                return this.$store.state.subNav.depositTable
            }
            
        },
        mounted(){

        }
    }
</script>