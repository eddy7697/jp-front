<template>
    <div class="gameIndex" @click="startMon()">
        <img width="480"  src="@/assets/images/mainPage/ads/index-game.png" alt="">
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'gameIndex',
        data() {
            return  {
                indexOne: ''
            }
        },
        methods: {
            startMon() {
                this.$router.push('system')
            }
        },
        mounted() {
        }
    }
</script>