<template>
  <div class="progress-bar">
    <div class="bar" ref="bar">
<!--      已播放的进度条-->
      <div class="progress" ref="progress"></div>
<!--      点-->
      <div class="dot" ref="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  watch: {
    percent (newValue) {
      if (newValue >= 0 && !this.touch.init) { // 拖动时进度条不动
        let totalWidth = this.$refs.bar.clientWidth - 16 // 减去按钮宽度
        let partWidth = totalWidth * newValue
        this.move(partWidth)
      }
    }
  },
  methods: {
    move (width) {
      this.$refs.progress.style.width = `${width}px`
      this.$refs.dot.style['transform'] = `translate3d(${width}px, 0, 0)`
    }
  }

}
</script>

<style scoped>
  .progress-bar {
    width: 100%;
    height: 30px;
  }
  .bar {
    position: relative;
    top: 13px;
    height: 4px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
  }
  .progress {
    position: absolute;
    height: 100%;
    background: #F49F86;
  }
  .dot {
    width: 16px;
    height: 16px;
    position: relative;
    top: -6px;
    left: -1px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 5px solid #fff;
    background: #F49F86;
  }

</style>
