<template>
    <div class="newsModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <h3>{{content.title}}</h3>
                    <p class="underLine"></p>
                </div>
                <div class="row">
                    <div v-html="content.content">
                    </div>
                </div>
                <div class="row">
                    <div  v-for="(item, index) in content.images['main']" :key="index" >
                        <img class="img-responsive" :src="item['origin']" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'newsModal',
    methods:{
        closeModal() {
            this.$store.dispatch('newsModal', {show: false, content: ''})
        }
    },
    computed:{
        content() {
            return this.$store.state.modalControl.newsModalContent
        }
    }
}
</script>
