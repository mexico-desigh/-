<template>
  <div>
    <h2>修改密码</h2>
    <el-form :model="passForm" status-icon :rules="passrules" ref="passForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新密码:" prop="pass" label-width="130px">
        <el-input style="width: 200px" type="text" v-model="passForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码:" prop="checkpass" label-width="130px">
        <el-input style="width: 200px" type="text" v-model="passForm.checkpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="PassForm('passForm')" >确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "updatePass",
  data() {
    var validatePass = (rule, value, callback) => {
      var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.passForm.checkPass !== "") {
          this.$refs.passForm.validateField(
            "请输入至少8-16个字符，至少1个大写字母，1个小写字母和1个数字"
          );
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passForm: {
        pass: "",
        checkpass: "",
      },
      passrules: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkpass: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    PassForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log("submit!");
          let { data } = await this.$axios({
            method: "POST",
            url: "/user/pass",
            data: {
              id: this.userInfo.id,
              oldPass: this.userInfo.pwd,
              newPass: this.passForm.pass,
            },
          });
          console.log(data);
          if (!data.code) {
            // 修改用户名成功
            this.$message.success(data.msg); // 提示
            this.userInfo.pwd = this.passForm.pass; // 修改userInfo的信息
            this.$refs[formName].resetFields(); //清空表单
          } else {
            this.$message.error(data.msg); // 提示
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
p {
  margin-left: 45px;
}
</style>