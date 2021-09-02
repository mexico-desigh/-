<template>
  <div class="container">
    <!-- 导航栏 -->
    <AppNav></AppNav>
    <div class="flex">
      <!-- 侧边栏 -->
      <Aside></Aside>
      <!-- 正文 -->
      <!-- <router-view></router-view> -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from "./components/AppNav/AppNav";
import Aside from "./components/Aside/Aside";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    AppNav,
    Aside,
  },
  methods: {
    ...mapMutations(["loginSuccess"]),
  },
  async created() {
    // 检测是否已登录
    let { data } = await this.$axios({
      method: "POST",
      url: "/login/check",
    });
    if (data.code) return;
    this.loginSuccess(data.data);
    console.log(this.baseURL);
  },
};
</script>

<style lang="less">
@import "./assets/images/icon/iconfont.css";
.container {
  max-width: 1300px;
  min-width: 800px;
  margin: 0 auto;
  color: #707070;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.content {
  width: 900px;
  height: 900px;
  background: rgb(236, 236, 236);
}
.flex {
  display: flex;
  justify-content: space-between;
}
.aside {
  width: 80%;
  margin: 10px auto;
  padding: 15px 17px;
  background: white;
  box-sizing: border-box;
}
</style>
