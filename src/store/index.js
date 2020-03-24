import Vue from 'vue'
import Vuex from 'vuex'

import music from './modules/music'
import search from './modules/search'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    music,
    search
  }
})
