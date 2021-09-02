<template>
  <div>
    <h2>上传头像</h2>
  <el-alert
    title="点击下方“+”传头像"
    type="warning"
    show-icon>
  </el-alert>
    <el-upload
  class="avatar-uploader"
  :action="baseURL + '/user/avatar'"   
  :show-file-list='false'
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  with-credentials=true
>
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "updateAvatar",
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    ...mapMutations(["loginSuccess"]),
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      if (res.code) {
        this.$message.error("头像上传失败，请稍后重试");
      }
      // 更新vuex
      this.loginSuccess(res.data);
    },
    beforeAvatarUpload(file) {
      const isJPG = /^image\/(JPEG|jpeg|jpg|png)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style lang="less">
.demo-block .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-upload--text {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  max-width: 178px;
  max-height: 178px;
}
</style>
