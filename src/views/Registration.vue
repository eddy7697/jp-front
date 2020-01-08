<template>
    <div id="Registration">
        <registrationSec />
        <regiForm/>
        <regiSMS v-if="regiSMS"/>
        <!-- <regiSuccess v-if="regiSuccess"/> -->
    </div>
</template>

<script>
import registrationSec from '@/components/secondNav/registrationSec'
import regiForm from '@/components/registration/regiForm'
import regiSMS from '@/components/modals/regiModal/regiSMS'
import regiSuccess from '@/components/modals/regiModal/regiSuccess'
    export default {
        name: 'Registration',
        components: {
            registrationSec,
            regiForm,
            regiSMS,
            regiSuccess,
        },
        computed: {
            regiSMS() {
                return this.$store.state.modalControlOne.regiSMS
            },
            regiSuccess() {
                return this.$store.state.modalControlOne.regiSuccess
            }
        },
        mounted() {
        }
    }
</script>