<template>
  <div class="aside">
    <div class="Info">
      <div class="img">
        <img src="" alt="">
      </div>
      <div class="name">
        <div>姓名</div>
        <div>年龄</div>
      </div>
    </div>
    <div class="btn">
      <div class="edit">edit</div>
    </div>
    <div class="link">
      <a href="" class="iconfont icon-huaban88" target="_blank"></a>
      <a href="" class="iconfont icon-weibo" target="_blank"></a>
      <a href="" class="iconfont icon-weixin" target="_blank"></a>
      <a href="" class="iconfont icon-qq" target="_blank"></a>
    </div>
  </div>
</template>
<script>
  export default {
    name: "asideTop"
  }
</script>
<style lang="less">
  .aside {
    .Info {
      display: flex;
      height: 80px;
      background: white;
      padding: 15px 17px;
      box-sizing: border-box;
      background: rgb(142, 212, 245);
      .img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        background: rgb(198, 206, 209);
        margin-right: 20px;
      }
      .name {
        height: 50px;
        div {
          font-size: 12px;
          line-height: 25px;
        }
      }
    }
    .btn {
      background: white;
      .edit {
        width: 50%;
        height: 30px;
        margin: 10px auto;
        background: rgb(142, 212, 245);
        border-radius: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
    .link {
      display: flex;
      justify-content: space-between;
      margin: 17px auto;
      margin-bottom: 0;
      background: white;
      padding: 0 17px;
      a {
        text-decoration: none;
        color: #707070;
        font-size: 20px;
      }
    }
  }
</style>
