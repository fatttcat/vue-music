<template>
  <div class="rank">
    <Scroll class="rank-scroll" ref="scroll" :data="topList">
      <ul class="list-container">
        <li v-for="item in topList" class="list-item" @click="getDetail(item)">
          <img :src="item.coverImgUrl" alt="">
          <ol class="text-list">
            <li v-for="(item, index) in item.tracks" class="list-item-text">
              <span>{{ index + 1 }}</span>
              <span>{{ item.first }}</span>
              <span>{{ item.second }}</span>
            </li>
          </ol>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import {getTopList} from '../../api/request'
import Scroll from '../../components/scroll/Scroll'
export default {
  name: 'Rank',
  components: {
    Scroll
  },
  data () {
    return {
      topList: []
    }
  },
  created () {
    getTopList().then(res => {
      for (var i = 0; i < 6; i++) {
        this.topList.push(res.data.list[i])
      }
    })
  },
  methods: {
    getDetail (item) {
      this.$router.push({
        // path: `/rank/${item.id}`
        path: `/rank/${item.id}`
      })
    }
  }
}
</script>

<style scoped>
  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    background-color: #262d37;
  }
  .rank-scroll {
    height: 100%;
    overflow: hidden;
  }
  .list-container {
    padding: 0 20px;
    margin: 0;
  }
  .list-item {
    background-color: #38414e;
    display: flex;
    align-items: center;
    list-style: none;
    margin-bottom: 10px;
    padding: 7px;
    border-radius: 10px;
  }
  .list-item img {
    width: 30%;
  }
  .text-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding: 20px;
  }
  .list-item-text {
    color: white;
    font-size: 14px;
    margin-bottom: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
