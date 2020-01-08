<template>
    <div class="Mall">
        <mallSec :nav="navToggle"></mallSec>
        <mallCenter v-if="navToggle == '2'"></mallCenter>
        <myTool v-if="navToggle == '1'"></myTool>
        <toolRecord v-if="navToggle == '3'"></toolRecord>
        <cardDesc v-if="cardModal"/>
        <toolConfirm v-if="toolConfirmModal" />
        <beforeBuyCard v-if="beforeBuyCard" />
        <invitationModal v-if="invitationModal" />
        <inviQrCodeModal v-if="inviQrCodeModalShow"/>
        <redEnvModal v-if="redEnvModal"/>
        <moveTreeModal v-if="moveTreeModal"/>
    </div>
</template>

<script>
import mallSec from '@/components/secondNav/mallSec'
import mallCenter from '@/components/mall/mallCenter'
import myTool from '@/components/mall/myTool'
import toolRecord from '@/components/mall/toolRecord'
import cardDesc from '@/components/modals/mall/cardDesc'
import beforeBuyCard from '@/components/modals/mall/beforeBuyCard'
import toolConfirm from '@/components/modals/tools/toolConfirm'
import redEnvModal from '@/components/modals/mall/redEnvModal'
import invitationModal from '@/components/modals/mall/invitation/invitationModal'
import inviQrCodeModal from '@/components/modals/mall/qrCodeModal/inviQrCodeModal'
import moveTreeModal from '@/components/modals/mall/moveTreeModal/moveTreeModal'

export default {
    name: 'Mall',
    components: {
        mallSec,
        mallCenter,
        myTool,
        toolRecord,
        cardDesc,
        toolConfirm,
        beforeBuyCard,
        redEnvModal,
        invitationModal,
        inviQrCodeModal,
        moveTreeModal
    },
    computed: {
        navToggle() {
            return this.$store.state.subNav.mallNav
        },
        cardModal() {
            return this.$store.state.modalControl.cardModal
        },
        beforeBuyCard() {
            return this.$store.state.modalControl.beforeBuyCard
        },
        toolConfirmModal() {
            return this.$store.state.modalControl.toolConfirmModal
        },
        redEnvModal() {
            return this.$store.state.modalControl.redEnvModal
        },
        invitationModal() {
            return this.$store.state.modalControl.invitationModal
        },
        inviQrCodeModalShow() {
            return this.$store.state.modalControlOne.inviQrCodeModalShow
        },
        moveTreeModal() {
            return this.$store.state.modalControlOne.moveTreeModal
        }
    }
}
</script>