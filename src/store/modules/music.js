const SET_PLAYING = 'SET_PLAYING' // 播放状态
const SET_PLAYER_SHOW = 'SET_PLAYER_SHOW' // 播放器显示
const SET_PLAYING_LIST = 'SET_PLAYING_LIST' // 播放列表
const SET_MODE = 'SET_MODE' // 播放模式
const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX' // 当前索引
const SET_PLAY_HISTORY = 'SET_PLAY_HISTORY' // 播放历史

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

const playMode = {
  sequence: 0, // 列表循环
  loop: 1, // 单曲循环
  random: 2 // 随机播放
}
const state = {
  playing: false, // 播放状态
  playerShow: false, // 播放器是否显示
  playList: [], // 播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲索引
  playHistory: [] // 播放历史
}

const actions = {
  selectPlay ({commit, state}, {songList, index}) { // 选择歌曲播放
    commit(SET_PLAYING, true)
    commit(SET_PLAYER_SHOW, true)
    commit(SET_PLAYING_LIST, songList)
    commit(SET_CURRENT_INDEX, index)
  },
  insertPlay ({commit, state}, song) { // 插入放放
    // let playlist = [...state.playList.slice(), song]
    // if (playlist.length === 1) {
    //   let currentIndex = state.currentIndex
    //   currentIndex++
    //   commit(SET_CURRENT_INDEX, currentIndex)
    //   commit(SET_PLAYING, true)
    // }
    // commit(SET_PLAYING_LIST, playlist)
    // commit(SET_PLAYER_SHOW, true)
    let playlist = state.playList.slice(0)
    let currentIndex = state.currentIndex
    // let currentSong = playlist[currentIndex]
    let fpIndex = findIndex(playlist, song)
    currentIndex++
    playlist.splice(currentIndex, 0, song)
    if (fpIndex > -1) {
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }
    commit(SET_PLAYING_LIST, playlist)
    commit(SET_CURRENT_INDEX, currentIndex)
    commit(SET_PLAYING, true)
    commit(SET_PLAYER_SHOW, true)
  },
  deleteSong ({commit, state}, song) {
    let playlist = state.playList.slice(0)
    let currentIndex = state.currentIndex
    // 查询待删除的歌曲
    let pIndex = findIndex(playlist, song)
    playlist.splice(pIndex, 1)
    if (currentIndex > pIndex || currentIndex === playlist.length) {
      currentIndex--
    }

    commit(SET_PLAYING_LIST, playlist)
    commit(SET_CURRENT_INDEX, currentIndex)

    let playingState = playlist.length > 0
    commit(SET_PLAYING, playingState)
  },
  deleteSongList ({commit, state}, song) {
    commit(SET_PLAYING_LIST, [])
    commit(SET_CURRENT_INDEX, -1)
    commit(SET_PLAYING, false)
  },
  playAllList ({ commit }, list) { // 播放全部
    commit(SET_CURRENT_INDEX, 0)
    commit(SET_PLAYING_LIST, list)
  },
  savePlayHistory ({commit, state}, item) { // 保存播放历史
    let playHistory = state.playHistory.slice()
    playHistory.push(item)
    commit(SET_PLAY_HISTORY, playHistory)
  }

}
const getters = {
  playing: state => state.playing,
  playerShow: state => state.playerShow,
  playList: state => state.playList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: state => state.playList[state.currentIndex] || {},
  playHistory: state => state.playHistory
}

const mutations = {
  [SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [SET_PLAYER_SHOW] (state, flag) {
    state.playerShow = flag
  },
  [SET_PLAYING_LIST] (state, list) {
    state.playList = list
  },
  [SET_MODE] (state, mode) {
    state.mode = mode
  },
  [SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [SET_PLAY_HISTORY] (state, playHistory) {
    state.playHistory = playHistory
  }

}
export default {
  state,
  actions,
  getters,
  mutations
}
