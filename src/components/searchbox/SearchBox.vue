<template>
    <div class="search-box">
      <span class="search-icon">&#xe651;</span>
      <input type="text" class="box" v-model="query" placeholder="请输入">
      <span class="search-clear" v-show="query" @click="clear">&#xe61c;</span>
    </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query: function () {
      this.$emit('queryChange', this.query)
    }
  },
  methods: {
    clear () {
      this.query = ''
    }
  }
}
</script>

<style scoped>
  .search-box {
    background-color: #38414e;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 6px;
    border-radius: 6px;
    color: #fff;
  }
  .search-icon {
    font-family: 'iconfont';
    /*color: white;*/
    font-size: 20px;
  }
  .box {
    background-color: #38414e;
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    border: 0;
    outline: none;
    color: #fff;
  }
  .search-clear {
    font-family: 'iconfont';
    color: white;
  }
  input::placeholder {
    color: #fff;
    /*font-size: 12px;*/
  }

</style>
