<template>
    <div class="singer">
      <div class="item" v-for="item in singerList" @click="getDetail">
        <span>{{item.name}}</span>
        <span class="icon">></span>
      </div>
    </div>
</template>

<script>
import {getSingerList} from '../../api/request'
// import Singer from '../../assets/js/singer'
import SingerList from '../singerlist/SingerList'
import pinyin from 'js-pinyin'

export default {
  name: 'Singer',
  data () {
    return {
      singerList: [],
    }
  },
  created () {
    // console.log(pinyin.getFullChars('管理员'))
    getSingerList().then(res => {
      for (var i = 0; i < res.data.artists.length; i++) {
        this.singerList.push(res.data.artists[i])
      }
    })
  },
  methods: {
    getDetail () {
      this.$router.push('/singerlist')
      console.log('ok')
    }
    // formatSinger (list) {
    //   let map = {
    //     hot: {
    //       title: '热门',
    //       items: []
    //     }
    //   }
    //   list.forEach((item, index) => {
    //     if (index < 10) {
    //       map.hot.items.push(new Singer({
    //         id: item.id,
    //         name: item.name,
    //         picture: item.picUrl
    //       }))
    //     }
    //     const key = getFirstCharacter()
    //   })
    // }
  }
}
</script>

<style scoped>
  .singer {
    display: flex;
    flex-direction: column;
    align-content: space-between;
  }
  .item {
    background-color: #566A7F;
    display: flex;
  }
  .icon {
    flex: 1;
    text-align: right;
  }

</style>
