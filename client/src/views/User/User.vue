<template>
  <div class="user">

  <!-- 修改用户名 -->
  <updateName></updateName>

  <!-- 修改密码 -->
<updatePass></updatePass>

  <!-- 修改头像 -->
  <updateAvatar></updateAvatar>
  </div>
</template>
<script>
import updateName from "../../components/User/updateName";
import updatePass from "../../components/User/updatePass";
import updateAvatar from "../../components/User/updateAvatar";
import { mapState } from "vuex";
export default {
  name: "User",
  components: {
    updateName,
    updatePass,
    updateAvatar,
  },
  // 监听userInfo 数据的变化
  watch: {
    userInfo() {
      this.backHome();
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    // 如果用户未登录，则返回首页
    backHome() {
      if (!this.userInfo.name) {
        this.$message.error("用户未登录");
        this.$router.replace("/"); // 返回首页
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.backHome();
    });
  },
};
</script>
<style lang="less">
.user {
  font-size: 14px;
  padding: 30px;
}
</style>
