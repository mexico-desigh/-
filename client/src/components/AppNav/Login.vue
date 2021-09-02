<template>
  <div>
    <div class="login">
      <el-button type="success" size="medium"  @click="showLogin">登录/注册</el-button>
    </div>
    <div v-if="ifshow" class="back" @click="closeLogin">
      <div class="box" @click.stop>
        <el-tabs v-model="activeName">
          <!-- 登录表单 -->
          <el-tab-pane label="登录" name="first">
            <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" prop="user" label-width="80px" style="marginBottom: 33px">
                <el-input type="text" v-model="ruleForm1.user" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" label-width="80px" style="marginBottom: 33px">
                <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="loginForm('ruleForm1')">登录</el-button>
                <el-button @click="resetForm('ruleForm1')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 注册表单 -->
          <el-tab-pane label="注册" name="second">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" prop="user" label-width="80px" style="marginBottom: 33px">
                <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" label-width="80px" style="marginBottom: 33px">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" label-width="80px" style="marginBottom: 33px">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="regForm('ruleForm2')">注册</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { mapMutations } from "vuex";
export default {
  data() {
    // 表单规则
    // 账号验证规则
    var validateUser = (rule, value, callback) => {
      var name = /^[a-zA-Z0-9_-]{4,16}$/;
      // 4到16位（字母，数字，下划线，减号）
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!name.test(value)) {
        callback(new Error("请输入4到16位（字母，数字，下划线，减号）"));
      } else {
        callback();
      }
    };
    // 密码验证规则
    var validatePass = (rule, value, callback) => {
      var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
      // 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pwd.test(value)) {
        callback(
          new Error(
            "请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字"
          )
        );
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
      // 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pwd.test(value)) {
        callback(
          new Error(
            "请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字"
          )
        );
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      ifshow: false,
      ruleForm1: {
        user: "",
        pass: "",
      },
      ruleForm2: {
        user: "",
        pass: "",
        checkPass: "",
      },
      // 表单规则
      rules2: {
        user: [
          {
            validator: validateUser,
            trigger: "blur",
          },
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
      rules1: {
        user: [
          {
            validator: validateUser,
            trigger: "blur",
          },
        ],
        pass: [
          {
            validator: validatePass1,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    showLogin() {
      this.ifshow = true;
    },
    closeLogin() {
      this.ifshow = false;
    },
    showInfo() {
      this.ifInfo = true;
    },
    editInfo() {},
    logout() {},
    // 登录验证
    loginForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          console.log("submit!");
          let { data } = await this.$axios({
            method: "POST",
            url: "/login",
            data: {
              name: this.ruleForm1.user,
              pwd: this.ruleForm1.pass,
            },
          });
          console.log(data);
          if (!data.code) {
            //登录成功
            this.$message.success(data.msg);
            this.ifshow = false; //关闭弹窗
            this.$refs[formName].resetFields(); //清空表单
            this.loginSuccess(data.data); // 将数据存储到userInfo
          } else {
            this.$message.error(data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册验证
    regForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          console.log("submit!");
          let data = await this.$axios({
            method: "POST",
            url: "/reg",
            data: {
              name: this.ruleForm2.user,
              pwd: this.ruleForm2.pass,
            },
          });
          console.log(data.data);
          if (data.data.code == 0) {
            ElMessage({
              showClose: true,
              message: data.data.msg,
              type: "success",
            });
          } else if (data.data.code) {
            ElMessage.error(data.data.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapMutations(["loginSuccess"]),
  },
};
</script>
<style lang="less">
.back {
  background: rgba(rgb(71, 71, 71), 0.3);
  width: 100%;
  margin: 0;
  height: 1000px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .box {
    margin: 200px auto;
    width: 300px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    padding: 20px;
    .el-menu-demo {
      border-bottom: 2px solid transparent;
      box-sizing: border-box;
    }
    .el-tabs__item {
      padding: 0 10px;
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.el-form-item {
  margin-bottom: 33px;
}
.login {
  margin: 15px;
}
</style>
