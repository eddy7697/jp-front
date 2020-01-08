<template>
    <div class="editUserForm">
        <editForm :title="title" :value="content"/>
        <adsModal v-if="adsModal" src="ads-regi.jpg" link="login"/>
    </div>
</template>
<script>
    import editForm from '@/components/edit/editForm'
    import adsModal from '@/components/modals/ads/adsModal'

    export default {
        name: 'editUserForm',
        data() {
            return {

            }
        },
        components: {
            editForm,
            adsModal
        },
        computed: {
            title(){
                return this.$store.state.editForm.title ? this.$store.state.editForm.title: ''
            },
            content(){
                return this.$store.state.editForm.content ? this.$store.state.editForm.content: ''
            },
            adsModal() {
                return this.$store.state.modalControl.adsModal
            }
        }
    }
</script>