<template>
  <div class="Aside">
    <asideTop></asideTop>
    <asideMid></asideMid>
    <asideBottom></asideBottom>
  </div>
</template>
<script>
import asideTop from "./asideTop"
import asideMid from "./asideMid"
import asideBottom from "./asideBottom"
export default {
  name: "Aside",
  components: {
    asideTop,
    asideMid,
    asideBottom
  }
}
</script>
<style lang="less">
.Aside {
  background: rgb(236, 236, 236);
  width: 350px;
  min-width: 350px;
  height: 1000px;
  margin-right: 50px;
  padding: 30px;
}
</style>
