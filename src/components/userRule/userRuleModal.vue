<template>
    <div class="userRuleModal">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <userRule/>
        </div>
    </div>
</template>
<script>
    import userRule from '@/components/userRule/userRule'
    export default {
        name: 'userRuleModal',
        components: {
            userRule
        },
         methods: {
            closeModal() {
                      this.$store.dispatch('userRuleModal', false)
            }
        }
    }
</script>