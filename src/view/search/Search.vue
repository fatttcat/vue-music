<template>
  <div class="search">
<!--    搜索框-->
    <div class="search-box-container">
      <SearchBox ref="searchbox" @queryChange="getQuery"></SearchBox>
    </div>
    <div class="search-content" v-show="!query">
      <Scroll class="search-content-scroll">
        <div>
          <!--      热门搜索-->
          <div class="hot-search" >
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotkeys" @click="clickItem(item.first)">
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
          <!--      搜索历史-->
          <div class="search-history" v-show="searchHistory.length">
            <div class="his-title">
              <span>搜索历史</span>
              <span class="icon" @click="clear">&#xe622;</span>
            </div>
            <SearchList :searchhistory="searchHistory" @delete="deleteSearchHistory"></SearchList>
          </div>
        </div>
      </Scroll>
    </div>
<!--    搜索结果-->
    <div class="search-result" v-show="query">
      <ResultList :query="query" @select="saveHis"></ResultList>
    </div>
  </div>
</template>

<script>
import SearchBox from '../../components/searchbox/SearchBox'
import ResultList from '../../components/resultlist/ResultList'
import SearchList from '../../components/searchlist/SearchList'
import Scroll from '../../components/scroll/Scroll'
import {getSearchHot} from '../../api/request'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchBox,
    ResultList,
    SearchList,
    Scroll
  },
  data () {
    return {
      hotkeys: [],
      query: '',
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  created () {
    // 获取热门搜索数据
    getSearchHot().then(res => {
      for (var i = 0; i <= res.data.result.hots.length; i++) {
        if (res.data.result.hots[i] !== undefined) {
          this.hotkeys.push(res.data.result.hots[i])
        }
      }
    })
  },
  methods: {
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory']),
    saveHis () {
      this.saveSearchHistory(this.query)
    },
    getQuery (query) {
      this.query = query
    },
    clickItem (key) {
      this.$refs.searchbox.query = key
      this.query = key
    },
    clear () {
      this.clearSearchHistory()
    }
  }
}
</script>

<style scoped>
  .search {
    /*height: 100vh;*/
    background-color: #262d37;
  }
  .search-box-container {
    padding: 20px;
  }
  .search-content {
    position: fixed;
    top: 165px;
    bottom: 0;
    width: 100%;
    background-color: #38414e;
  }
  .search-content-scroll {
    height: 100%;
    overflow: hidden;
  }
  .hot-search {
    margin: 0 20px 20px 20px;
  }
  .title {
    padding-top: 10px;
    font-size: 15px;
    color: #fff;
  }
  .hot-search ul {
    padding: 0;
    margin-top: 0;
  }
  .item {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 10px 5px 0;
    border-radius: 6px;
    font-size: 14px;
    color: #fff;
    background-color: #262d37;
  }
  .search-history {
    /*position: relative;*/
    margin: 0 20px;
    color: #fff;
  }
  .his-title {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 165px;
    bottom: 0;
  }
  .icon {
    font-family: iconfont;
  }

</style>
