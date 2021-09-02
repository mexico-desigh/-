<template>
  <div class="aside">
    <div class="hot">
      <div class="hot-title">标题</div>
      <div class="hot-content">内容</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "asideMid"
  }
</script>
<style lang="less">
  .aside {
    .hot {
      background: white;
      .hot-title {
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
      }
      .hot-content {
        font-size: 14px;
        line-height: 25px;
      }
    }
  }
</style>