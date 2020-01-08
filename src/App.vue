<template>
  <div id="app">
    <avatars v-if="avatarModal"/>
    <Navibar v-if="shouldShow"/>
    <sideNav  v-hammer:swipe.left="onSwipeRight" v-if="toggleSideNav && shouldShow" />
    <qrCodeScan v-if="qrCodeScanner"/>
    <router-view/>
    <pcFooter v-if="shouldShow && shouldShow"/>
    <Footer v-if="shouldShow && shouldShow"/>
    <busyLoading v-if="busyLoading" />
    <qrCode v-if="qrCodeModal"/>
    <buffQrCode v-if="buffQrCode"/>
    <p class="hidden">{{reloadPageStart}}</p>
    <userRuleModal v-if="userRuleModal"/>
  </div>
</template>
<script>
  import Navibar from '@/components/naviBar/naviBar'
  import Footer from '@/components/footer/footer'
  import pcFooter from '@/components/footer/pcFooter'
  import sideNav from '@/components/sideNav/sideNav'
  import avatars from '@/components/modals/pages/avatars'
  import qrCodeScan from '@/components/qrCodeScan/qrCodeScan'
  import busyLoading from '@/components/modals/busyLoading/busyLoading'
  import qrCode from '@/components/contractShop/qrCode/qrCode'
  import buffQrCode from '@/components/buff/buffQrCode'
  import userRuleModal from '@/components/userRule/userRuleModal'

  import { mapGetters, mapState } from "vuex"
  export default {
        name: 'app',
        components: {
          Navibar,
          Footer,
          sideNav,
          avatars,
          qrCodeScan,
          busyLoading,
          qrCode,
          pcFooter,
          buffQrCode,
          userRuleModal
        },
        props: {
        },
        methods: {
          toTrigger() {
            let data = {};
            data['url'] = this.$root.$options.api['api1'];
            data['client_id'] = '922301cb2254401cc84399578ec473de';
            data['client_secret'] = 'a7428d49d6d40dee87f43c4588154f0c';
            let i = this.$store.dispatch('postApi', data);
            i.then((result)=>{
              console.log(result)
              this.$store.dispatch('updateToken', result);
            })
          },
          onSwipeRight(direction) {
               this.$store.dispatch('toggleNav', this.toggle)
          },
        },
        computed: {

          userRuleModal()  {
              return this.$store.state.modalControl.userRuleModal
          },
          buffQrCode() {
              return this.$store.state.modalControlOne.buffQrCode
          },
          toggleSideNav() {
            return this.$store.state.accountNav.toggleSide;
          },
          qrCodeScanner() {
            return this.$store.state.modalControl.qrCodeToggle;
          },
          qrCodeModal() {
              return this.$store.state.modalControl.qrCodeModal
          },
          getP(queryString) {
              var query = {};
              var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
              for (var i = 0; i < pairs.length; i++) {
                  var pair = pairs[i].split('=');
                  query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
              }
              return query;
          },
          shouldShow () {
            if(this.$route.query.contractShop) {
              this.$store.dispatch('scModal',  {show: true, content: {'name': this.$route.query['name'], 'uid': this.$route.query['uid']}})
              setTimeout(()=>{
                this.$router.push({name: 'contractShop', params: { scPay: "true"}})
              }, 300)
            }
            if(this.$route.query.Registration){
              this.$store.dispatch('invitationQRAuth', this.$route.query['auth'])
              this.$router.push('/registration')
            }
            if(
              this.$route.path == '/Login' ||
              this.$route.path == '/registrationRules' ||
              this.$route.path == '/' ||
              this.$route.path == '/registration'
            ) {
              this.$store.dispatch('navBarShow', false)
            } else {
              this.$store.dispatch('navBarShow', true)
            }
            return this.$store.state.naviBar.show;
          },
          avatarModal() {
              return this.$store.state.modalControl.avatarModal;
          },
          busyLoading() {
              return this.$store.state.modalControl.busyLoading;
          },
          reloadPageStart() {
              if(this.$store.state.sweetAlert.reload){
                this.$router.go(this.$store.state.sweetAlert.url)
                location.reload()
              }
          }
        },
        data: () => {
            return {
              show: false,
            }
        },
        async mounted() {
          this.$store.dispatch('toggleNav', false)
          this.toTrigger()
          
        },
        beforeCreate() {
          //  window.location = 'http://localhost:8080/#/?Registration=true'
          //  window.location = 'http://localhost:8080/#/?Registration=true&auth=582158759f4de1d3cbd08a25546e4c980c945456486a225a90eca94aeb8f64a8992304840f700841775'
        }
    }
</script>
<style lang="scss">
  @import "./assets/style/main.scss";
</style>
