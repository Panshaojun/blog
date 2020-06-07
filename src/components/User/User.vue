<template>
  <div id="user">
    <el-dialog title="头像上传" :visible.sync="dialogVisible" width="300">
      <el-upload
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        drag
        action="http://localhost:1337/users/user_addHead"
        :with-credentials="true"
        multiple
        style="margin: 0 30%"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将图片拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-dialog>
    <el-row>
      <el-col :span="4" :offset="2" style="padding-top:50px">
        <el-avatar shape="square" :size="200" :src="squareUrl" :key="squareUrl"></el-avatar>
        <el-link type="primary" @click="dialogVisible=true">上传新头像</el-link>
      </el-col>
      <el-col :span="10" :offset="1">
        <h3 style="margin:20px 0 20px 30px">基础资料</h3>
        <el-form ref="form" :model="updData" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="updData.name" :placeholder="user.__user.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="updData.mail" :placeholder="user.__user.mail"></el-input>
          </el-form-item>
          <el-form-item label="网站">
            <el-input v-model="updData.url" :placeholder="user.__user.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelInfo">更新我的资料</el-button>
          </el-form-item>
        </el-form>

        <h3 style="margin:100px 0 20px 30px">更新密码</h3>
        <el-form ref="form" :model="password" label-width="80px">
          <el-form-item label="新密码">
            <el-input v-model="password.new" placeholder="最低6个字符长度"></el-input>
          </el-form-item>
          <el-form-item label="再次确认">
            <el-input v-model="password.agian" placeholder="最低6个字符长度"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelPssword">更新我的密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
//I think you need: Emit Prop Watch
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {
  created() {
    this.squareUrl = `${(this.$root as any).host}/${this.user.__user.head}`;
  }
  squareUrl = `${(this.$root as any).host}/${this.user.__user.head}`;
  dialogVisible = false;
  password = {
    new: "",
    agian: ""
  };
  get user() {
    return (this.$root as any).User;
  }

  //头像上传
  handleSuccess(response: any, file: any) {
    if (response.err) {
      this.$message.error(response.info);
    } else {
      this.$message({
        type: "success",
        message: "上传成功！"
      });
      const read = new FileReader();
      read.readAsDataURL(file.raw);
      read.onload = (e)=> {
        this.squareUrl=(e as any).target.result;
      };
      this.user.refresh(response);
    }
  }
  handleError() {
    this.$message.error("请检查网络设置");
  }

  //信息更新
  updData = {
    name: "",
    url: "",
    mail: ""
  };
  handelInfo() {
    if (this.updData.name.length < 3 && this.updData.name.length)
      return this.$message.error("用户名要么为空要么超过2个字符");
    this.user.updInfo(Object.assign({}, this.updData), (data: any) => {
      if (data) {
        this.$message({ type: "success", message: "更新信息成功！" });
        this.updData.name = "";
        this.updData.url = "";
        this.updData.mail = "";
        this.user.refresh(data);
      } else {
        this.$message.error("更新信息失败！");
      }
    });
  }
  //密码更新
  handelPssword() {
    if (this.password.new.length < 6 || this.password.agian.length < 6)
      return this.$message.error("密码长度不符合");
    else if (this.password.new !== this.password.agian)
      return this.$message.error("两次密码不一致");
    else
      this.user.upd({ password: this.password.new }, (data: any) => {
        if (data) {
          this.$message({ type: "success", message: "更新密码成功！" });
          this.password.new = "";
          this.password.agian = "";
          this.user.refresh(data);
        } else {
          this.$message.error("更新密码失败！");
        }
      });
  }
}
</script>

<style scoped lang='less'>
#user {
  .head {
    height: 200px;
    width: 200px;
    background-color: gray;
    border-radius: 5px;
    position: relative;
    img {
      height: 200px;
      width: 200px;
    }
  }
  .el-avatar {
    cursor: pointer;
  }
}
</style>