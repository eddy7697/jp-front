<template>
    <div class="gameSecNav">
        <div class="container">
            <div class="row">  
                <div class="gameNav">
                    <div 
                    :class="{active: Active == '2'}"
                    @click="()=>{clickNav('2')}">{{txT['GAME']}}</div>
                    <div
                    :class="{active: Active == '3'}"
                    @click="()=>{clickNav('3')}"
                    >{{txT['RECORD']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gameSecNav',
        props: {

        },
        data() {
            return {
            }
        },
        methods: {
            clickNav(nu) {
                this.$store.dispatch('toggleNav', false)
                if(nu == '2'){
                    this.$router.push('system')
                    this.$store.dispatch('gameSec', '2')
                    return
                }
                if(nu == '3'){
                    this.$router.push('game')
                    this.$store.dispatch('gameSec', '3')
                    return
                }
                this.$store.dispatch('gameSec', nu)
            }
        },
        computed: {
            Active() {
                return this.$store.state.subNav.gameSec
            },
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        mounted() {
        }
    }
</script>