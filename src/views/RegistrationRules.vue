<template>
    <div id="RegistrationRules">
        <registrationSec/>
        <userRule />
        <userRuleFooter />
    </div>
</template>

<script>
import registrationSec from '@/components/secondNav/registrationSec'
import userRule from '@/components/userRule/userRule'
import userRuleFooter from '@/components/userRule/userRuleFooter'

    export default {
        name: 'RegistrationRules',
        components: {
            registrationSec,
            userRule,
            userRuleFooter
        },
        computed: {
        },
        mounted() {
        }
    }
</script>