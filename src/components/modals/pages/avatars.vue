<template>
    <div class="avatars">
        <div class="content">
            <div>
                <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            </div>
            <div v-for="i in 48" :key="index">
                <img @click="selectAvatar(i)" class="avatar" :src="imgs(i)" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'avtars',
        methods: {
            imgs(i) {
                
                return require(`@/assets/images/avatar/user_${i}.png`);
            },
            closeModal() {
                this.$store.dispatch('avatarModal', false)
            },
            selectAvatar(i) {
                this.$store.dispatch('avatarModal', false)
            }
        }
    }
</script>