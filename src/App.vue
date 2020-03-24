<template>
  <div id="app">
    <HeaderBar class="home-header" v-show="isShow">
<!--      <span slot="left">&#xe617;</span>-->
<!--      <span slot="content">My Music</span>-->
<!--      <span slot="icon">&#xe72c;</span>-->
    </HeaderBar>
    <Tab v-show="isShow"></Tab>
    <router-view></router-view>
    <Player></Player>

  </div>
</template>

<script>
import HeaderBar from './components/headerbar/HeaderBar'
import Tab from './components/tab/Tab'
import Player from './components/player/Player'
export default {
  name: 'App',
  data () {
    return {
      isShow: true
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.path === '/history' || this.$route.path.indexOf('/rank/') > -1 || this.$route.path.indexOf('/home/') > -1) {
        this.isShow = false
      } else {
        this.isShow = true
      }
      // if (this.$route.path === '/' || this.$route.path === '/home') {
      //   this.isShow = true
      // }
    }
  },
  components: {
    HeaderBar,
    Tab,
    Player
  }
}
</script>

<style>
  @import "assets/css/common.css";
  .header img {
    width: 30px;
    height: 30px;
  }

</style>
