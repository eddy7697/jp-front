<template>
  <div class="System">
    <carouselDiv></carouselDiv>
    <div class="waist">
      <div class="Game">
        <gameSecNav/>
        <game/>
      </div>
    </div>
  </div>
</template>
<script>
import carouselDiv from '@/components/system/carousel/carousel';
import tradeArea from '@/components/system/tradeArea/tradeArea';
import newest from '@/components/system/newest/newest';
import gameSecNav from '@/components/secondNav/gameSec';
import game from '@/components/game/game';

export default {
  name: 'System',
  components: {
    carouselDiv,
    tradeArea,
    gameSecNav,
    newest,
    game
  },
  mounted() {
    this.$store.dispatch('gameSec', '2')
  }
}
</script>