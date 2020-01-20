<template>
    <div class="adsModal" >
        <div class="content" v-if="this.$route.name == 'editUserForm'">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <img @click="imgLink()" :src="srcPic" alt="" class="img-responsive">
            <div style="margin:auto;width:200px;">
                <h5 class="text-left" v-if="this.$route.name == 'editUserForm'">
                    <span>
                        加入LINE@<br/>下一波優惠活動，將從LINE@送出
                    </span>
                </h5>
                <button @click="imgLink()" v-if="this.$route.name == 'editUserForm'" class="btn btn-lg btn-primary">加入LINE@</button>
            </div>
        </div>
        <div class="content" v-if="this.$route.name !== 'editUserForm'">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <img class="img-responsive" src="~@/assets/images/mainPage/ads/adhk.jpg" alt="">
        </div>
    </div>
</template>
<script>
import redirect from './../../../redirect'
export default {
    name: 'adsModal',
    props: {
        src: '',
        link: ''
    },
    data() {
        return {
            btnTxt: ''
        }
    },
    methods:{
        imgLink() {
            window.open('https://line.me/R/ti/p/%40534ryvzc#~')
        },
        closeModal() {
            if(this.$route.name == 'editUserForm'){
                redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['EDITSUCCESS'] , 'success')
                this.$store.dispatch('adsModal', false)
            }
            this.$store.dispatch('adsModal', false)
        },
        linkExplore() {
            if(this.link == 'login') {
                window.location = '/'
                this.btnTxt = '回首頁'
                return 
            }
            window.open(this.link)
            this.btnTxt = '加入LINE@'
            return 
        }
    },
    computed:{
        srcPic() {
            if(this.link == 'login') {
                this.btnTxt = '回首頁'
            } else {
                this.btnTxt = '加入LINE@'
            } 
            if(this.src) {
                return require(`@/assets/images/modals/ads/${this.src}`)
            }
        }
    },
    mounted() {
    }
}
</script>
