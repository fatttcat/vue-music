<template>
  <div class="disc">
    <ListDetail :title="title" :coverImg="coverImg" :songList="songList"></ListDetail>
  </div>
</template>

<script>
import ListDetail from '../../components/listdetail/ListDetail'
import {getListDetail} from '../../api/request'
export default {
  name: 'Disc',
  components: {
    ListDetail
  },
  data () {
    return {
      songList: [],
      coverImg: '',
      title: ''
    }
  },
  created () {
    getListDetail(this.$route.params.id).then(res => {
      for (var i = 0; i < res.data.playlist.tracks.length; i++) {
        this.songList.push(res.data.playlist.tracks[i])
      }
      // this.songList = res.data.playlist.tracks
      this.coverImg = res.data.playlist.coverImgUrl
      this.title = res.data.playlist.name
    })
  }
}
</script>

<style scoped>

</style>
