<template>
    <div class="coinsHistoryNav">
        <div class="container">
            <div class="row">
                <div class="coins-navigation">
                    <div :class="{'active': activeNav == 'all'}" @click="()=>{toggle('all')}">
                        全部
                    </div>
                    <div :class="{'active': activeNav == 'gold'}"  @click="()=>{toggle('gold')}">
                        金幣
                    </div>
                    <div :class="{'active': activeNav == 'ucoin'}"  @click="()=>{toggle('ucoin')}">
                        回饋幣
                    </div>
                    <div :class="{'active': activeNav == 'bonus'}"  @click="()=>{toggle('bonus')}">
                        紅利
                    </div>
                    <div :class="{'active': activeNav == 'gift'}"  @click="()=>{toggle('gift')}">
                        禮券
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'coinsHistoryNav',
        data () {
            return {
                activeNav: 'all'
            }
        },
        methods: {
            toggle (string) {
                this.$store.dispatch('coinSubNav', string)
                this.activeNav = string;
            },
            toGetTableInfo() {
                
            }
        }
    }
</script>