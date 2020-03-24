<template>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/home">
        <span>首页</span>
      </router-link>
<!--      <router-link tag="div" class="tab-item" to="/singer">-->
<!--        <span>歌手</span>-->
<!--      </router-link>-->
      <router-link tag="div" class="tab-item" to="/rank">
        <span>排行</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <span>搜索</span>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style scoped>
  .tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    background-color: #262d37;
  }
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: white;
  }
  .tab-item span {
    /*padding-bottom: 5px;*/
    /*border-bottom: 3px solid orange;*/
    /*!*display: inline-block;*!*/
    /*width: 40px;*/
    /*height: 35px;*/
  }
  .router-link-active {
    color: #F49F86;
    /*border-bottom: 3px solid orange;*/
  }
  .router-link-active.tab-item span {
    padding-bottom: 3px;
    border-bottom: 2px solid #F49F86;
  }

</style>
