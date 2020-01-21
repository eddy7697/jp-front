<template>
    <div class="naviBarIcons">
        <div class="icons">
            <div class="icon float-left"  style="width:45px;">
                <div :class="{'toggleNavState': toggleNavState}" @click="toggleSideNav()">
                    <div class="hamburger hamburger--v1 js-hamburger" :class="{'is-active': toggleNavState}">
                        <div class="hamburger__bar"></div>
                    </div>
                </div>
            </div>
            <img class="logo" @click="redirect('mainPage')" src="~@/assets/images/logo.png" alt="">  
            <div class="icon float-right">
                <span class="notified_untrade" v-if="notify>0">{{notify}}</span>
                <img @click="redirect('/receivePage')" src="~@/assets/images/navibar/icons/icon-mail.png" alt=""> 
            </div>
            <div class="icon float-right">
                <img class="hidden" @click="qrAdd()" src="~@/assets/images/navibar/icons/icon-add.png" alt="">  
            </div> 
        </div>
    </div>
</template>
<script>
    const swal = require('sweetalert2')
    export default {
        name: 'naviBarIcons',
        data() {
            return {
                toggle: false,
                items: [],
                notify: 0
            }
        },
        methods: {
            getUnread() {
                let data = {}
                data['url'] = this.$root.$options.api['api44']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                let res = this.$store.dispatch('getApi', data) 
                res.then((val)=>{
                    if (val['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        var data = val['data']
                        this.notify = data[0]['cycle'] + data[0]['general'] + data[0]['individual']
                        console.log(data)
                    }
                })    
            },
            redirect(url) {
                this.$router.push(url)
                this.$store.dispatch('toggleNav', false)
            },
            toggleSideNav() {
                this.toggle = !this.toggle
                this.$store.dispatch('toggleNav', this.toggle)
            },
            qrAdd() {
                var ans = new Promise((res, rej)=>{
                    this.items.forEach((item)=>{
                        if(item['code'] == 'referrer_buff') {
                            res(item)
                        }
                    }) 
                    res(false)
                }) 
                ans.then((res)=> {
                        if(res){
                            this.$store.dispatch('buffQrCode', {show: true, content: res})
                            this.$store.dispatch('toggleNav', false)
                        } else {
                            swal.fire({
                            title: '您未有發財卡',
                            text: '請至商城購買發財卡',
                            type: 'warning',
                            confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                            }).then(()=>{
                                this.$router.push('Mall')
                            })
                        }
                })
            },
            buff() {
                let data = {}
                data['url'] = this.$root.$options.api['api4']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.$store.dispatch('updateBuff', item)
                        this.items = item['data']['items']
                    }
                })
            },
            qrCodeScanner() {
              this.$store.dispatch('qrCodeScanner', true)
              this.$store.dispatch('toggleNav', false)
            }
        },
        computed: {
            toggleNavState() {
                return this.$store.state.accountNav.toggleSide
            }
        },
        mounted() {
            this.buff()
            this.getUnread()
            // $(function() {
            //     var $hamburgers = $('.js-hamburger');
            //     $hamburgers.on('click', function(event) {
            //         event.preventDefault();
            //         $(this).toggleClass('is-active');
            //     });
            // });
        }
    }
</script>
