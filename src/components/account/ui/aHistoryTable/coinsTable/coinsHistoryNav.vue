<template>
    <div class="coinsHistoryNav">
        <div class="container">
            <div class="row">
                <div class="coins-navigation">
                    <div :class="{'active': activeNav == 'all'}" @click="()=>{toggle('all')}">
                        {{txT['ALL']}}
                    </div>
                    <div :class="{'active': activeNav == 'gold'}"  @click="()=>{toggle('gold')}">
                        {{txT['GOLD']}}
                    </div>
                    <div :class="{'active': activeNav == 'ucoin'}"  @click="()=>{toggle('ucoin')}">
                        {{txT['REWARDS']}}
                    </div>
                    <div :class="{'active': activeNav == 'bonus'}"  @click="()=>{toggle('bonus')}">
                        {{txT['BONUS']}}
                    </div>
                    <div :class="{'active': activeNav == 'gift'}"  @click="()=>{toggle('gift')}">
                        {{txT['GIFTCARD']}}
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
        },
        computed: {
            txT(){
                return this.$root.$options['languageSet']
            }
        }
    }
</script>