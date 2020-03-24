const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY'
const DELETE_SEARCH_HISTORY = 'DELETE_SEARCH_HISTORY'
const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY'

const state = {
  searchHistory: []
}
const actions = {
  saveSearchHistory ({commit}, query) { // 保存搜索记录
    let searchHistory = [query, ...state.searchHistory.slice()]
    searchHistory = [...new Set(searchHistory)]
    commit(SET_SEARCH_HISTORY, searchHistory)
  },
  deleteSearchHistory ({commit}, index) {
    commit(DELETE_SEARCH_HISTORY, index)
  },
  clearSearchHistory ({commit}) {
    commit(CLEAR_SEARCH_HISTORY)
  }
}
const getters = {
  searchHistory: state => state.searchHistory
}
const mutations = {
  [SET_SEARCH_HISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [DELETE_SEARCH_HISTORY] (state, index) {
    state.searchHistory.splice(index, 1)
  },
  [CLEAR_SEARCH_HISTORY] (state) {
    state.searchHistory = []
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
