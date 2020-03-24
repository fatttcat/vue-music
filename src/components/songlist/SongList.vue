<template>
  <div class="song-list">
    <ul>
      <li v-for="(item,index) in songList" class="song-item" @click="play(songList,index)">
        <div class="rank">
          <span>{{index + 1}}</span>
        </div>
        <div class="info">
          <div class="name">{{item.name}}</div>
          <div>
            <span class="others">{{getInfo(item)}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    // ...mapActions(['selectPlay']),
    getInfo (item) {
      const singer = item.ar && item.ar[0].name
      const album = item.al && item.al.name
      return `${singer} - ${album}`
    },
    play (songList, index) {
      this.$store.dispatch('selectPlay', {songList, index})
    }
  }
}
</script>

<style scoped>
  .song-list {
    width: 100%;
    background-color: #262d37 ;
  }
  .song-list ul {
    padding: 0;
    margin: 0;
  }
  .song-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    list-style: none;
    height: 54px;
    font-size: 16px;
    color: #fff;
  }
  .rank {
    flex: 0 0 25px;
    width: 25px;
    margin: 0 8px;
    text-align: center;
  }
  .info {
    flex: 1;
  }
  .name {
    font-size: 14px;
  }
  .others {
    display: block;
    width: 60%;
    line-height: 20px;
    overflow: hidden;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

</style>
