<template>
  <div>
    <div class="AppNav">
      <div class="appnav">
        <!-- 名字 -->
        <div class="name">披着毛毯去冒险</div>
        <!-- 导航栏 -->
        <div class="nav">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
              <router-link to="/">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/article">文章</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/message">留言</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/link">友链</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link to="/about">关于</router-link>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 登录注册 -->
        <div>
          <User v-if="userInfo.name"></User>
          <Login v-else></Login>
          
        </div>
      </div>
    </div>
    <!-- 表单处理 -->

  </div>
</template>
<script>
import Login from "./Login"
import User from "./User"
import {mapState} from "vuex"
  export default {
    name: "AppNav",
    components: {
      Login,User
    },
    computed: {
      ...mapState(['userInfo'])
    },
    data() {
      return {
        activeIndex: "1"
      }
    },
  }
</script>
<style lang="less">
  .AppNav {
    color: #333;
    width: 100%;
    height: 50px;
    margin: 0 auto;
    margin-bottom: 20px; // border-bottom: 2px solid #e6e6e6;
    .appnav {
      max-width: 1300px;
      min-width: 800px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .name {
        line-height: 50px;
      }
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 400px;
        box-sizing: border-box;
        li {
          padding: 0;
          text-align: center;
        }
        a {
          text-decoration: none;
          color: #333;
          line-height: 50px;
          display: block;
          width: 68px;
        }
        .el-menu-item {
          border-bottom: 2px solid #8cc5ff;
          height: 50px;
          line-height: 50px;
          box-sizing: content-box;
          padding-bottom: 2px;
          color: #8cc5ff;
        }
        .router-link-active {
          color: #8cc5ff;
        }
        .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
        .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
          outline: 0;
          color: #8cc5ff;
          border-bottom-color: #8cc5ff;
        }
        .el-menu-demo {
          border-bottom: 2px solid transparent;
          box-sizing: border-box;
          height: 54px;
        }
      }
    }
  }

</style>
