<template>
  <div class="playlist" v-show="isShow">
    <div class="list-container">
<!--      顶部-->
      <div class="top">
        <div class="top-container">
          <div class="mode">
            <span class="icon">&#xe61e;</span>
            <span class="text">{{modeText}}</span>
          </div>
          <span class="clear" @click="clear">&#xe622;</span>
        </div>
      </div>
<!--      中部-->
      <div class="middle">
        <Scroll class="middle" :data="playList">
          <ul>
            <li class="item" :key="index" v-for="(item, index) in playList" @click="play(item, index)">
              <span class="current">&#xe613;</span>
              <span class="song-name">{{item.name}}</span>
              <span class="singer-name"></span>
              <span class="icon" @click.stop="del(item)">&#xe61c;</span>
            </li>
          </ul>
        </Scroll>
      </div>
      <div class="bottom">
        <div class="close" @click="close">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import Scroll from '../scroll/Scroll'
export default {
  name: 'PlayList',
  props: ['isShow'],
  components: {
    Scroll
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['playerShow', 'playList', 'currentSong', 'mode']),
    modeText () { // 播放模式
      let text = ''
      switch (this.mode) {
        case 0:
          text = '列表循环'
          break
        case 1:
          text = '单曲循环'
          break
        case 2:
          text = '随机播放'
          break
      }
      return text
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayerShow: 'SET_PLAYER_SHOW',
    }),
    ...mapActions(['deleteSong', 'deleteSongList']),
    play (item, index) {
      this.setCurrentIndex(index)
    },
    close () {
      this.$emit('update', false)
    },
    del (item) {
      this.deleteSong(item)
      if (!this.playList.length) {
        this.setPlayerShow(false)
        // this.$emit('isShowChange', false)
      }
    },
    clear () {
      this.deleteSongList()
      this.setPlayerShow(false)
    }
  }
}
</script>

<style scoped>
  .playlist {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
  }
  .list-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #38414e;
    color: #fff;
  }
  .top {
    position: relative;
    padding: 20px 30px 10px 20px;
  }
  .top-container {
    display: flex;
    align-items: center;
  }
  .mode {
    flex: 1;
  }
  .icon{
    font-family: iconfont;
  }
  .text {

  }
  .clear {
    font-family: iconfont;
  }
  .middle {
    overflow: hidden;
    max-height: 240px;
    width: 100%;
  }
  .list {
    /*height: 100%;*/
    /*overflow: hidden;*/
  }
  .middle ul {
    margin: 0;
    padding: 0;
  }
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
  }
  .current {
    flex: 0 0 20px;
    width: 20px;
    font-family: iconfont;
  }
  .song-name {
    flex: 1;
  }
  .singer-name {

  }
  .close {
    text-align: center;
    line-height: 50px;
  }

</style>
