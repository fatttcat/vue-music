<template>
    <div class="searchlist">
      <ul class="list" v-for="item in searchhistory" :key="item">
        <li class="item">
          <span class="text">{{item}}</span>
          <span class="icon" @click="deleteItem(item)">&#xe61c;</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: {
    searchhistory: {
      type: Array,
      default: []
    }
  },
  methods: {
    deleteItem (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped>
.searchlist{
  padding-top: 5px;
}
.list {
  padding: 0;
  margin: 0;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 14px;
}
.icon {
  font-family: iconfont;
  font-size: 16px;
}
</style>
