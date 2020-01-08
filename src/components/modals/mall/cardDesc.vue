<template>
    <div class="cardDesc">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div v-html="content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cardDesc',
    methods:{
        closeModal() {
            this.$store.dispatch('cardModal', {show: false, content: ''})
        }
    },
    computed:{
        content() {
            return this.$store.state.modalControl.cardModalContent
        }
    }
}
</script>
