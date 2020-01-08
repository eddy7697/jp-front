<template>
    <div class="tradeSubNav">
        <div class="container">
            <div class="row">
                <div class="coins-navigation">
                    <div :class="{'active': activeNav == 'sell'}" @click="()=>{toggle('sell')}">
                        我要賣
                    </div>
                    <div :class="{'active': activeNav == 'buy'}"  @click="()=>{toggle('buy')}">
                        我要買
                    </div>
                    <div :class="{'active': activeNav == 'ucoin'}"  @click="()=>{toggle('ucoin')}">
                        專屬回饋幣
                    </div>
                </div>
            </div>
            <buyTable v-if="activeNav == 'buy'"/>
            <sellTable v-if="activeNav == 'sell'"/>
            <ucoinTable v-if="activeNav == 'ucoin'"/>
        </div>
    </div>
</template>

<script>
    import buyTable from '@/components/trade/ui/tradeTable/allThreeTable/buyTable'
    import sellTable from '@/components/trade/ui/tradeTable/allThreeTable/sellTable'
    import ucoinTable from '@/components/trade/ui/tradeTable/allThreeTable/ucoinTable'

    export default {
        name: 'tradeSubNav',
        data () {
            return {
                activeNav: 'buy'
            }
        },
        components: {
            buyTable,
            sellTable,
            ucoinTable
        },
        methods: {
            toggle (string) {
                this.$store.dispatch('toggleNav', false)
                this.activeNav = string;
            }
        }
    }
</script>