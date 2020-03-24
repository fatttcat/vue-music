<template>
    <div class="player" v-show="playerShow">
<!--      全屏播放器-->
      <div class="fullscreen-player">
<!--        背景图-->
        <div class="background">
          <img :src="currentSong.al && currentSong.al.picUrl" alt="" width="100%" height="100%">
        </div>
<!--        顶部-->
        <div class="top">
<!--          <HeaderBar>-->
<!--            <span slot="left" @click="back" class="icon">&#xe63e;</span>-->
<!--            <span slot="content">{{currentSong.name}}</span>-->
<!--          </HeaderBar>-->
          <div class="header">
            <div class="icon" @click="back">&#xe63e;</div>
            <div class="text">{{currentSong.name}}</div>
          </div>
          <div class="singer">
            {{currentSong.ar && currentSong.ar[0].name}}
          </div>
        </div>
<!--        中部-->
        <div class="middle" @click="middleClick">
<!--          cd-->
          <div class="middle-left" v-show="middleLeft">
            <div class="cd-container">
              <div class="cd" :class="playing ? 'play' : 'play pause'">
                <img class="image" :src="currentSong.al && currentSong.al.picUrl" alt="">
              </div>
            </div>
            <div class="lyric-container">
              <div class="lyric">{{playingLyric}}</div>
            </div>
          </div>
<!--          歌词-->
          <Scroll ref="lyricList" class="middle-right" :data="currentLyric && currentLyric.lines">
            <div class="right-lyric-container">
              <div class="right-lyric">
                <div class="text" ref="lyricLine" v-for="(item,index) in currentLyricLines" :key="index" :class="{'current': currentLineNum ===index}">
                  {{item.txt}}
                </div>
              </div>
            </div>
          </Scroll>
        </div>
<!--        底部-->
        <div class="bottom">
<!--          分页点-->
          <div class="dot-container">
            <span></span>
            <span></span>
          </div>
<!--          进度条-->
          <div class="progress-container">
            <span class="time time-left">{{format(currentTime)}}</span>
            <ProgressBar :percent="percent"></ProgressBar>
            <span class="time time-right">{{format(duration)}}</span>
          </div>
<!--          操作区域-->
          <div class="operators">
            <div class="icon">
              <span>&#xe61e;</span>
            </div>
            <div class="icon">
              <span @click="playPrev">&#xe636;</span>
            </div>
            <div class="icon">
              <span @click="isPlaying" v-if="playing">&#xe639;</span>
              <span @click="isPlaying" v-else >&#xe635;</span>
            </div>
            <div class="icon">
              <span @click="playNext">&#xe637;</span>
            </div>
            <div class="icon">
              <span @click="showList">&#xe638;</span>
            </div>
          </div>
        </div>
      </div>
<!--      播放列表-->
      <PlayList :isShow="isShow" :isShowChange="change" @update="update"></PlayList>
      <audio  ref="audio"
              @playing="ready"
              @pause="pause"
              @ended="ended"
              @timeupdate="timeupdate"
              >
<!--        :src="currentUrl"-->
<!--        @play="canplay"-->
<!--        @error="error"-->
<!--        @timeupdate="timeupdate"-->
<!--        @ended="ended"-->
      </audio>
    </div>
</template>

<script>
import Lyric from 'lyric-parser'
import Scroll from '../scroll/Scroll'
import HeaderBar from '../headerbar/HeaderBar'
import PlayList from '../playlist/PlayList'
import ProgressBar from '../progressbar/ProgressBar'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getSong} from '../../api/request'
import {getLyric} from '../../api/request'
export default {
  name: 'Player',
  data () {
    return {
      isShow: false, // 控制播放列表显示
      currentTime: 0, // 当前播放时间
      duration: 0, // 歌曲时长
      currentUrl: '',
      songCanplay: false,
      currentLyric: null,
      currentLyricLines: [],
      currentLineNum: 0,
      playingLyric: '无歌词数据',
      middleLeft: true
    }
  },
  components: {
    HeaderBar,
    PlayList,
    ProgressBar,
    Scroll
  },
  watch: {
    'currentSong.id': async function (newValue) {
      await getSong(newValue).then(res => {
        console.log(res)
        // this.currentUrl = res.data.data[0].url
        if (res.data.data[0].url) {
          this.$refs.audio.src = res.data.data[0].url
        } else {
          alert('请求出错')
        }
        this.$refs.audio.play()
      })
      if (this.currentLyric) {
        this.currentLyric.stop()
        // this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      await getLyric(newValue).then(res => {
        this.currentLyricLines.length = 0
        this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
        for (var i = 0; i < this.currentLyric.lines.length; i++) {
          this.currentLyricLines.push(this.currentLyric.lines[i])
        }
        console.log(this.currentLyricLines)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    'playing': function (newValue) {
      this.$nextTick(() => {
        newValue ? this.$refs.audio.play() : this.$refs.audio.pause()
      })
    }
  },
  computed: {
    ...mapGetters(['playing', 'playList', 'playerShow', 'currentIndex', 'currentSong', 'mode']),
    percent () {
      return this.currentTime / this.duration
    }
  },
  methods: {
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlayList: 'SET_PLAYING_LIST',
      setPlayerShow: 'SET_PLAYER_SHOW',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setMode: 'SET_MODE',
    }),
    ...mapActions(['savePlayHistory']),
    change() {
      console.log('ok')
      this.isShow = false
    },
    middleClick () {
      this.middleLeft = !this.middleLeft
    },
    format (val) { // 格式化时间戳
      let min = Math.floor(val / 60).toString().padStart(2, '0')
      let sec = Math.floor(val % 60).toString().padStart(2, '0')
      return `${min}:${sec}`
    },
    // 隐藏播放器
    back () {
      this.setPlayerShow(false)
    },
    showList () {
      this.isShow = true
    },
    update (value) {
      this.isShow = value
    },
    // 点击播放/暂停播放
    isPlaying () {
      // if (!this.songCanplay) {
      //   return
      // }
      this.setPlaying(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    playPrev () { // 播放上一首
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.isPlaying()
        }
      }
    },
    playNext () { // 播放下一首
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.isPlaying()
        }
      }
    },
    ready () {
      this.duration = this.$refs.audio.duration // 获得歌曲时长
      this.savePlayHistory(this.currentSong) // 保存播放歌曲
    },
    pause () {
      this.setPlaying(false)
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    ended () {
      if (this.mode === 1) {
        this.loop()
      } else {
        this.playNext()
      }
    },
    timeupdate (e) { // 得到当前时间
      this.currentTime = e.target.currentTime
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)// 滚动到元素
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)// 滚动到顶部
      }
      console.log(txt)
      this.playingLyric = txt
    }
  }
}
</script>

<style scoped>
  .fullscreen-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    /*background-color: #f8f8f8;*/
    background-color: #262d37;
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    filter: blur(20px);
  }
  .header {
    font-family: iconfont;
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .header .icon {
    position: absolute;
    left: 0;
  }
  .header .text {
    line-height: 44px;
    color: #fff;
  }
  .singer {
    line-height: 20px;
    text-align: center;
    color: #fff;
  }
  .middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 14px;
  }
  .middle-left {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
  }
  .cd-container {
    position: absolute;
    left: 10%;
    top: 0;
    width: 80%;
    height: 100%;
  }
  .cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;
    border: 10px solid rgba(255,255,255,0.1);
  }
  @keyframes rotate{
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
  }
  .play {
    animation: rotate 30s linear infinite;
  }
  .pause {
    animation-play-state: paused;
  }
  .lyric-container {
    width: 80%;
    margin: 30px auto 0 auto;
    overflow: hidden;
    text-align: center;
    color: #fff;
  }
  .lyric {
    height: 20px;
    line-height: 20px;
  }
  .middle-right {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .right-lyric-container {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
  }
  .current {
    color: #fff;
  }
  .text {
    line-height: 32px;
  }
  .bottom{
    position: absolute;
    bottom: 50px;
    width: 100%;
  }
  .progress-container{
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
  }
  .time {
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    font-size: 10px;
    color: #fff;
  }
  .time-left {
    text-align: left;
    margin-right: 5px;
  }
  .time-right {
    text-align: right;
    margin-left: 5px;
  }
  .operators {
    display: flex;
    align-items: center;
  }
  .icon {
    flex: 1;
    font-family: iconfont;
    text-align: center;
    color: #fff;
  }
  .icon span {
    font-size: 30px;
  }

</style>
