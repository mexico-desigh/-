<template>
  <div>
    <div class="demo-basic--circle" @click="showInfo">
      <div class="block">
        <el-avatar :size="50" :src="baseURL + userInfo.avatar + random"></el-avatar>
      </div>
      <div v-if="ifshow" class="showinfo">
        <div @click="editInfo">修改信息</div>
        <div @click="logOut">退出登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "User",
  data() {
    return {
      random: `?_=${Date.now()}`,
      ifshow: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
    userInfo() {
      this.random = `?_=${Date.now()}`;
    },
  },
  methods: {
    ...mapMutations(["logout"]),
    showInfo() {
      this.ifshow = !this.ifshow;
    },

    // 修改信息
    editInfo() {
      this.$router.push("/user"); //跳转到user页面
    },

    // 退出登录
    async logOut() {
      let { data } = await this.$axios({
        method: "POST",
        url: "/login/logout",
      });
      console.log(data);
      if (data.code) return;
      this.$message.success(data.msg); // 提示退出成功
      this.logout(); // 清除vuex里面的userInfo
    },
  },
};
</script>
<style lang="less">
.demo-basic--circle {
  position: relative;
}
.showinfo {
  position: absolute;
  top: 60px;
  left: -34px;
  width: 80px;
  padding: 10px 10px;
  background: white;
  box-sizing: border-box;
  div {
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #bfbfc0;
    &:hover {
      border-bottom: 1px solid #8cc5ff;
      color: #8cc5ff;
      cursor: pointer;
    }
  }
}
</style>
