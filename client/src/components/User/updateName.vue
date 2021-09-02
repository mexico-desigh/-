<template>
  <div>
    <h2>修改用户名</h2>
    <p>当前用户名：<span>{{userInfo.name}}</span></p>
    <el-form :model="nameForm" status-icon :rules="namerules" ref="nameForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新用户名:" prop="name" label-width="130px">
        <el-input style="width: 200px" type="text" v-model="nameForm.name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="NameForm('nameForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "updateName",
  data() {
    var validateName = (rule, value, callback) => {
      var name = /^[a-zA-Z0-9_-]{4,16}$/;
      if (value.trim() === "") {
        callback(new Error("请输入新用户名"));
      } else if (value == this.userInfo.name) {
        callback(new Error("用户名未修改"));
      } else if (!name.test(value)) {
        callback(new Error("请输入4到16位（字母，数字，下划线，减号）"));
      } else {
        callback();
      }
    };
    return {
      nameForm: {
        name: "",
      },
      namerules: {
        name: [
          {
            validator: validateName,
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
    NameForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log("submit!");
          let { data } = await this.$axios({
            method: "POST",
            url: "/user/name",
            data: {
              oldName: this.userInfo.name,
              newName: this.nameForm.name,
              id: this.userInfo.id,
            },
          });
          console.log(data);
          if (!data.code) {
            // 修改用户名成功
            this.$message.success(data.msg); // 提示
            this.userInfo.name = this.nameForm.name; // 修改userInfo的信息
            this.$refs[formName].resetFields(); //清空表单
          } else {
            this.$message.error(data.msg);
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
  margin-left: 42px;
}
</style>