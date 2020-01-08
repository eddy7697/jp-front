<template>
    <div class="Game">
        <gameSecNav/>
        <game v-if="this.$route.path == '/System'"/>
        <gameHistory/>
    </div>
</template>
<script>
    import gameSecNav from '@/components/secondNav/gameSec';
    import game from '@/components/game/game';
    import gameHistory from '@/components/game/gameHistory/table';

    export default {
        name: 'Game',
        components: {
            gameSecNav,
            game,
            gameHistory
        }
    }
</script>
