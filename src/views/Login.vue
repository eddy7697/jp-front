<template>
  <div class="login">
    <div id="content" class="container">
        <LoginForm v-if="!toggolePw"></LoginForm>
        <forgetPassword v-if="toggolePw"></forgetPassword>
        <userRuleModal v-if="userRuleModal"/>
        <regiSMS v-if="regiSMS"/>

    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/loginForm'
import forgetPassword from '@/components/login/forgetPassword'
import userRuleModal from '@/components/userRule/userRuleModal'
import regiSMS from '@/components/modals/regiModal/regiSMS'

export default {
  name: 'login',
  components: {
    LoginForm,
    forgetPassword,
    userRuleModal,
    regiSMS
  },
  computed: {
    toggolePw() {
      return this.$store.state.login['forgetPassword']
    },
    userRuleModal()  {
      return this.$store.state.modalControl.userRuleModal
    },
    regiSMS() {
      return this.$store.state.modalControlOne.regiSMS
    }
  },
  mounted() {
    this.$store.dispatch('navBarShow', false)
  }
}
</script>
