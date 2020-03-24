<template>
    <div class="loading">
      <img src="../../assets/image/loading.gif" alt="">
      <div class="text">{{text}}</div>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>

<style scoped>
  .loading {
    width: 100%;
    text-align: center;
  }

</style>
