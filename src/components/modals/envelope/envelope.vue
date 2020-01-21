<template>
    <div class="envelope">
        <div class="content" v-if="!done">
            <div @click="openImg(1)">
                <img :src="enveOne" alt="">
                <div class="price">{{priceOne}}</div>
            </div>
            <div @click="openImg(2)">
                <img :src="enveTwo" alt="">
                <div class="price">{{priceTwo}}</div>
            </div>
            <div @click="openImg(3)">
                <img :src="enveThree" alt="">
                <div class="price">{{priceThree}}</div>
            </div>
            <div @click="openImg(4)">
                <img :src="enveFour" alt="">
                <div class="price">{{priceFour}}</div>
            </div>
        </div>
        <div class="congrat" v-if="done">
            <div class="text-center">
                <h5 class="text-white">抽中 {{percentageWon}}%</h5>
                <img class="congrat-Img" src="@/assets/images/envelope/mail_envelope_con.png" alt="">
                <div class="price">{{priceWon}}</div>
                <h6>可於下次消費折抵{{Math.floor(priceWon/200)}}元</h6>
                <button class="btn btn-success" @click="doneGame()">{{this.$root.$options['languageSet']['CONFIRMTXT']}}</button>
            </div>
        </div>
    </div>
</template>
<script>
    import redirect from './../../../redirect'

    export default {
        name: 'envelope',
        data() {
            return {
                clickImg: false,
                clickImgTwo: false,
                clickImgThree: false,
                clickImgFour: false,
                done: false,
                priceOne: '',
                priceTwo: '',
                priceThree: '',
                priceFour: '',
                priceWon: ''
            }
        },
        methods: {
            openImg(nu) {
                switch(nu){
                    case 1:
                        this.clickImg = !this.clickImg
                        this.priceOne = this.priceWon
                        this.priceTwo = this.content.fake[0]
                        this.priceThree = this.content.fake[1]
                        this.priceFour = this.content.fake[2]
                    break;
                    case 2:
                        this.clickImgTwo = !this.clickImgTwo
                        this.priceOne = this.content.fake[0]
                        this.priceTwo = this.priceWon
                        this.priceThree = this.content.fake[1]
                        this.priceFour = this.content.fake[2]
                    break;
                    case 3:
                        this.clickImgThree = !this.clickImgThree;
                        this.priceOne = this.content.fake[0]
                        this.priceTwo =  this.content.fake[1]
                        this.priceThree = this.priceWon
                        this.priceFour = this.content.fake[2]
                    break;
                    case 4:
                        this.clickImgFour = !this.clickImgFour;
                        this.priceOne = this.content.fake[0]
                        this.priceTwo = this.content.fake[1]
                        this.priceThree = this.content.fake[2]
                        this.priceFour = this.priceWon
                    break;
                    default:
                }
                setTimeout(()=>{
                    this.clickImg = true
                    this.clickImgTwo = true
                    this.clickImgThree = true
                    this.clickImgFour = true
                    setTimeout(()=>{
                        this.done = true
                    }, 3000)
                }, 1000)
            },
            doneGame() {
                this.$store.dispatch('enveModal', {show: false, content: ''})
                redirect.redirect('/#/receivePage', '成功', this.$root.$options['languageSet']['ALREADIRECIVED'], 'success', true)
            }
        }, 
        computed: {
            content() {
                // console.log(this.$store.state.modalControl.envelopeModalContent)
                return this.$store.state.modalControl.envelopeModalContent
            },
            enveOne() {
                if(this.clickImg) 
                return require('@/assets/images/envelope/mail_envelope_open.png');
                else
                return require('@/assets/images/envelope/mail_envelope_cover.png');
            },
            enveTwo() {
                if(this.clickImgTwo) 
                return require('@/assets/images/envelope/mail_envelope_open.png');
                else
                return require('@/assets/images/envelope/mail_envelope_cover.png');
            },
            enveThree() {
                if(this.clickImgThree) 
                return require('@/assets/images/envelope/mail_envelope_open.png');
                else
                return require('@/assets/images/envelope/mail_envelope_cover.png');
            },
            enveFour() {
                if(this.clickImgFour) 
                return require('@/assets/images/envelope/mail_envelope_open.png');
                else
                return require('@/assets/images/envelope/mail_envelope_cover.png');
            }

        },
        mounted() {
            this.priceWon = this.content['final']['point']
            this.percentageWon = this.content['final']['percent']*100
            console.log(this.content)
        }
        
    }

</script>