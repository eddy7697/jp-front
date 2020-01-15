<template>
    <div class="gameArea">
        <div class="wrapper">
            <div class="row">
                <!-- <div id="molopoly" class="molopoly">
                    <img v-if="moloOn" class="img-responsive" @click="startMon()" src="@/assets/images/game/polomoly.gif?v=1" alt="">
                    <img v-if="!moloOn" class="img-responsive" src="@/assets/images/game/molopolyMaintain.png?v=1" alt="">
                    <div class="game-div" style="height: 45px;position:relative;top:11px;line-height: 30px;">
                        <a href="https://m.facebook.com/story.php?story_fbid=2448838375349566&id=2125596931007047" class="blue-link" style="padding-top: 2px;">遊戲介紹</a>
                    </div>
                    <div class="game-div" style="height: 45px;position:relative;top:11px;line-height: 30px;">
                        <a href="#doc" @click="doc = !doc" class="blue-link" style="height:33px; line-height: 30px;">遊戲說明</a>
                    </div>
                    <img id="doc" v-if="doc" class="molopoly-doc img-responsive" src="https://www.ucoin.com.tw/assets/richmanvv.jpg?v02" alt="">
                    <div v-if="doc" style="cursor:pointer;" class="text-center" @click="doc = !doc">
                        <a href="#molopoly">
                            <i class="fa fa-chevron-circle-up"></i>
                            <h3>關掉說明</h3>
                        </a>
                    </div>
                </div> -->
                <div class="game-div" v-if="item.status !== 2 && item.name !== '大富翁中尾彩'" v-for="(item, index) in gameList" :key="index">
                    <div>
                    <img @click="startGame(item.redirect_url)" v-if="item.images.up && item.status == 1" :src="item.images.up[0]['mobile']" alt="">
                    <img @click="startGame(item.redirect_url)" v-if="item.images.down && item.status == 2" :src="item.images.down[0]['mobile']" alt="">
                    <img @click="startGame(item.redirect_url)" v-if="item.images.maintain && item.status == 3" :src="item.images.maintain[0]['mobile']" alt="">
                    <img @click="startGame(item.redirect_url)" v-if="item.images.comingsoon && item.status == 4" :src="item.images.comingsoon[0]['mobile']" alt="">
                    <div class="gray-link">{{txT['GAMEINTRO']}}</div>
                    <!-- <a :href="item.fb" :class="{'blue-link': item.fb, 'gray-link': !item.fb}">遊戲介紹</a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import allGame from '@/components/game/game/allGame';
    import axios from 'axios';

    export default {
        name: 'gameArea',
        components:{
            allGame
        },
        props: {
        },
        data(){
            return {
                gameList: [],
                doc: false,
                moloOn: true
            }
        },
        methods: {
            startMon() {
                axios({
                    method: 'get',
                    url: `${process.env.VUE_APP_API_URL}${this.$root.$options.api['api51']}`,
                    headers: {
                    'Authorization': localStorage.getItem('Authorization'),
                    'Identity': localStorage.getItem('identity'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    window.location = `${process.env.VUE_APP_MONO_URL}${response['data']['data']['token']}`
                })
                .catch((error) => {
                }).then((item)=>{
                })
            },
            startGame(redirectUrl) {
                axios({
                    method: 'get',
                    url: redirectUrl,
                    headers: {
                    'Authorization': localStorage.getItem('Authorization'),
                    'Identity': localStorage.getItem('identity'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    window.location = response['data']['data']['url']
                })
                .catch((error) => {
                }).then((item)=>{
                })
                
            }
        },
        computed: {
            txT() {
                return this.$root.$options['languageSet']
            },
            toggleClass(boolean) {
                if(boolean == 1) return 'blue-link'
                else
                return 'gray-link'
            }
        },
        mounted() {
            let data = {}
            data['url'] = this.$root.$options.api['api50']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                this.gameList = item['data'].reverse()
                this.gameList.forEach((item)=> {
                    if(item['name'] == '大富翁中尾彩' && item['status'] !== 1) {
                        this.moloOn = false
                    }
                })
                console.log(this.gameList)
            })
        }
    }
</script>