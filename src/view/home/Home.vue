<template>
  <div class="home">
    <Scroll ref="scroll" class="home-content" :data="songList">
      <div>
        <!--    轮播图-->
        <ic-slider :autoplay="3000">
          <ic-slider-item v-for="(items, index) in bannerList" :key="index">
            <img :src="items.imageUrl"/>
          </ic-slider-item>
        </ic-slider>
        <!--    热门歌单-->
        <div class="hot-list">
          <h1 class="title">热门歌单</h1>
          <div class="list-container">
            <div class="list-item" v-for="item in songList" @click="getDetail(item)">
              <img class="list-img" :src="item.coverImgUrl" alt="">
              <div>
                <div class="list-name">{{item.name.replace(/\s*/g,'')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      加载组件-->
<!--      <div v-if="!songList.length" class="loading-container">-->
<!--        <Loading></Loading>-->
<!--      </div>-->
    </Scroll>
  </div>
</template>

<script>
import {getBanner} from '../../api/request'
import {getSongList} from '../../api/request'
import {IcSlider, IcSliderItem} from 'vue-better-slider'
import Scroll from '../../components/scroll/Scroll'
import Loading from '../../components/loading/Loading'
export default {
  name: 'Home',
  data () {
    return {
      bannerList: [],
      songList: []
    }
  },
  components: {
    IcSlider,
    IcSliderItem,
    Scroll,
    Loading
  },
  created () {
    getBanner().then(res => {
      for (var i = 0; i < res.data.banners.length; i++) {
        this.bannerList.push(res.data.banners[i])
      }
    })
    getSongList().then(res => {
      for (var i = 0; i < res.data.playlists.length; i++) {
        this.songList.push(res.data.playlists[i])
      }
    })
  },
  methods: {
    getDetail (item) {
      this.$router.push({
        path: `/home/${item.id}`
      })
    }
  }
}
</script>

<style scoped>
  .home {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
  .home-content {
    height: 100%;
    overflow: hidden;
    background-color: #262d37;
    color: #fff;
  }
  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 5px;
  }
  .list-item {
    /*flex: 1;*/
    /*float: left;*/
    width: 32%;
    margin-bottom: 10px;
    /*margin-right: 12px;*/
  }
  .title {
    font-size: 20px;

  }
  .list-img {
    width: 100%;
  }
  .list-name {
    width: 100%;
    height: 40px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
