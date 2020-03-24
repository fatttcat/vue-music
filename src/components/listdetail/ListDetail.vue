<template>
    <div class="list-detail">
      <div class="cover" :style="setImg" ref="cover">
        <div class="filter" ref="filter"></div>
        <div class="play-btn" ref="btn">
          <span class="play-icon">&#xe63a;</span>
          <span class="play-text">全部播放</span>
        </div>
      </div>
      <div class="header">
        <span class="h-icon" @click="back">&#xe63e;</span>
        <span class="h-title">{{title}}</span>
      </div>
      <Scroll ref="scroll" class="list" :data="songList" @scroll="scroll">
        <div class="list-container">
          <SongList :songList="songList"></SongList>
        </div>
      </Scroll>
    </div>
</template>

<script>
import Scroll from '../scroll/Scroll'
import SongList from '../songlist/SongList'
export default {
  name: 'ListDetail',
  components: {
    Scroll,
    SongList
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    coverImg: {
      type: String,
      default: ''
    },
    songList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    setImg () {
      return `background-image:url(${this.coverImg})`
    }
  },
  created () {
    // console.log(this.songList)
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY (newValue) {
      let zIndex = 0
      let scale = 1
      const formula = Math.abs(newValue / this.$refs.cover.clientHeight)
      if (newValue > 0) {
        zIndex = 10
        scale = 1 + formula
        this.$refs.cover.style['transform'] = `scale(${scale})`
        this.$refs.cover.style['webkitTransform'] = `scale(${scale})`
      }
    }
  }
}
</script>

<style scoped>
  .cover {
    z-index: 5;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
    transform-origin: top;
    background-size: 100%;
    /*background-color: red;*/
  }
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
  }
  .header {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .h-icon {
    /*position: absolute;*/
    /*left: 0;*/
    font-family: iconfont;
    /*color: white;*/
    font-size: 22px;
    font-weight: bold;
    margin-left: 5px;
    color: #fff;
  }
  .h-title {
    color: #fff;
  }
  .play-btn {
    display: flex;
    height: 35px;
    line-height: 35px;
    z-index: 10;
    background: #262d37;
    color: #fff;
  }
  .play-icon {
    font-family: iconfont;
    font-size: 24px;
    margin: 0 8px;
  }
  .play-text {
    font-size: 18px;
  }
  .list {
    position: fixed;
    top: 50%;
    bottom: 0;
    width: 100%;
  }
  /*.list-container {*/
  /*  width: 100%;*/
  /*  !*position: fixed;*!*/
  /*  height: 300px;*/
  /*}*/
  /*.list {*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  bottom: 0;*/
  /*  width: 100%;*/
  /*}*/
  /*.list-container {*/
  /*  !*padding: 20px 30px;*!*/
  /*}*/

</style>
