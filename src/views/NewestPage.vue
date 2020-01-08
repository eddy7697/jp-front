<template>
    <div class="NewestPage">
        <newsSec />
        <newsTable />
        <newsModal v-if="modalToggle"/>
    </div>
</template>

<script>
    import newsSec from '@/components/secondNav/newsSec'
    import newsTable from '@/components/tables/newsTable'
    import newsModal from '@/components/modals/news/newsModal'
    export default {
        name : 'Newest',
        components: {
            newsSec,
            newsTable,
            newsModal
        },
        computed: {
            modalToggle() {
                return this.$store.state.modalControl.newsModal
            }
        },
        mounted() {

        }
    }
</script>