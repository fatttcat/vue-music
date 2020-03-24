<template>
  <div class="headerbar">
    <div class="left-icon" @click="clickIcon">&#xe617;</div>
    <div class="text">music</div>
    <div class="right-icon" @click="showPlayer">
      <div class="cd" :class="playing ? 'play' : 'play pause'" >
        <img  class="image" src="../../assets/image/cd.png" alt="" >
      </div>
    </div>

<!--    <div class="h_left">-->
<!--      <slot name="left"></slot>-->
<!--    </div>-->
<!--    <div class="h_content">-->
<!--      <slot name="content"></slot>-->
<!--    </div>-->
<!--    <div class="h_icon">-->
<!--      <slot name="icon"></slot>-->
<!--    </div>-->
  </div>
</template>

<script>

import { mapGetters,mapMutations } from 'vuex'

export default {
  name: 'HeaderBar',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['playing'])

  },
  methods: {
    ...mapMutations({
      setPlayerShow: 'SET_PLAYER_SHOW',
    }),
    clickIcon () {
      this.$router.push('history')
    },
    showPlayer () {
      this.setPlayerShow(true)
    }
  }
}
</script>

<style scoped>
  .headerbar {
    font-family: iconfont;
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #262d37;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    color: #f8f8f8;
  }
  .left-icon {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 33px;
    color: #f8f8f8;
  }
  .right-icon {
    position: absolute;
    top: 2px;
    right: 5px;
    font-size: 33px;
    color: #f8f8f8;
  }
  .cd {
    width: 30px;
    height: 30px;
  }
  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  @keyframes rotate{
    from{transform: rotate(0deg); }
    to{transform: rotate(360deg); }
  }
  .play {
    animation: rotate 10s linear infinite;
    transform-origin: 50% 50%;
  }
  .pause {
    animation-play-state: paused;
  }
</style>
