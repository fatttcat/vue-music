<template>
  <!--  <div class="result-list" v-show="query">-->
  <Scroll ref="scroll" class="result-list-scroll" :data="result">
    <ul class="list">
      <li class="item" v-for="item in result" @click="play(item)">
        <span class="icon">&#xe651;</span>
        <span class="name">{{item.name}}</span>
      </li>
    </ul>
  </Scroll>
  <!--  </div>-->
  </template>

<script>
import {getSearchResult} from '../../api/request'
import Scroll from '../scroll/Scroll'
import { mapActions } from 'vuex'
export default {
  name: 'ResultList',
  components: {
    Scroll
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: []
    }
  },
  watch: {
    query: function () {
      this.result = []
      if (this.query !== '') {
      // 获取搜索结果
        getSearchResult(this.query).then(res => {
          for (var i = 0; i < res.data.result.songs.length; i++) {
            this.result.push(res.data.result.songs[i])
          }
        })
      }
    }
  },
  methods: {
    ...mapActions(['insertPlay']),
    play (item) {
      console.log(item)
      this.insertPlay(item)
      this.$emit('select') // 保存搜索历史
    // this.$store.dispatch('selectPlay', {songList, index})
    }
  }
}
</script>

    <style scoped>
    .result-list {
      /*position: fixed;*/
    }
  .result-list-scroll {
    height: 100%;
    overflow: hidden;
    background-color: #38414e;
    color: #fff;
  }
  .list {
    padding: 10px 25px;
  }
  /*ul {*/
  /*  padding: 10px;*/
  /*  margin: 10px 0;*/
  /*  background-color: orange;*/
  /*}*/
  .item {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    font-size: 14px;
    font-size: 14px;
  }
  .icon {
    flex: 0 0 30px;
    width: 30px;
    font-family: iconfont;
    font-size: 14px;
  }

</style>
