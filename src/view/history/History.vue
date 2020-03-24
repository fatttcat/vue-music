<template>
<div class="history">
<!--  <HeaderBar>-->
<!--    <span slot="left" @click="back">返回</span>-->
<!--    <span slot="content">最近播放</span>-->
<!--  </HeaderBar>-->
  <div class="header">
    <div class="icon" @click="back">&#xe63e;</div>
    <div class="text">最近播放</div>
  </div>
  <div class="play-btn" @click="playAll">
    <span>&#xe63a;</span>
    <span>播放全部</span>
  </div>
  <div class="play-list">
    <Scroll ref="scroll" class="list" :data="playHistory" @scroll="scroll">
      <div class="list-container">
        <SongList :songList="playHistory"></SongList>
      </div>
    </Scroll>
  </div>

</div>
</template>

<script>
import HeaderBar from '../../components/headerbar/HeaderBar'
import Scroll from '../../components/scroll/Scroll'
import SongList from '../../components/songlist/SongList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'History',
  components: {
    HeaderBar,
    Scroll,
    SongList
  },
  computed: {
    ...mapGetters(['playHistory'])
  },
  methods: {
    ...mapActions(['playAllList']),
    back () {
      this.$router.go(-1)
    },
    playAll () {
      this.playAllList(this.playHistory)
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  }
}
</script>

<style scoped>
.history {
    font-family: iconfont;
  background-color: #262d37;
  height: 100vh;
}
.header {
  position: relative;
  height: 44px;
  line-height: 44px;
  background: #262d37;
  text-align: center;
  color: #fff;
}
.icon {
  position: absolute;
  left: 0;
}
.play-btn {
  margin: 10px auto;
  padding: 2px 0;
  width: 30%;
  border: 1px solid #fff;
  border-radius: 15px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.play-btn span {

}
.play-list {
  /*border: 1px solid black;*/
  /*height: 100%;*/
  /*overflow: hidden;*/
  position: fixed;
  top: 13%;
  bottom: 0;
  width: 100%;
}
.list {
  height: 100%;
  overflow: hidden;
}
/*.list-container {*/
/*  height: 100%;*/
/*  overflow: hidden;*/
/*}*/

</style>
