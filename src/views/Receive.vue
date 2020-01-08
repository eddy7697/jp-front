<template>
    <div class="receivePage">
        <receiveContent />
        <envelope v-if="envelopGame" :content="envelopGameContent" />
        <confirmSureReceive v-if="confirmSureReceive"/>
    </div>
</template>
<script>
    import receiveContent from '@/components/receive/receiveContent'
    import envelope from '@/components/modals/envelope/envelope'
    import confirmSureReceive from '@/components/modals/receive/confirmSureReceive'
    export default {
        name: 'receivePage',
        components: {
            receiveContent,
            envelope,
            confirmSureReceive
        },
        computed: {
            envelopGame() {
                return this.$store.state.modalControl.envelopeModal
            },
            envelopGameContent() {
                return this.$store.state.modalControl.envelopeModalContent
            },
            confirmSureReceive() {
                return this.$store.state.modalControl.confirmSureReceive
            }
        }
    }
</script>